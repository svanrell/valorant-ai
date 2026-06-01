import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ValorantGateway } from "./valorant.gateway";
import * as fs from "fs";
import * as path from "path";
import * as https from "https";
import { firstValueFrom } from "rxjs";

const MAPS_MAP: Record<string, string> = {
  "/Game/Maps/Ascent/Ascent": "Ascent",
  "/Game/Maps/Bonsai/Bonsai": "Split",
  "/Game/Maps/Canyon/Canyon": "Fracture",
  "/Game/Maps/Duality/Duality": "Bind",
  "/Game/Maps/Foxtrot/Foxtrot": "Breeze",
  "/Game/Maps/Jam/Jam": "Lotus",
  "/Game/Maps/Jamboree/Jamboree": "Abyss",
  "/Game/Maps/Pitt/Pitt": "Pearl",
  "/Game/Maps/Port/Port": "Icebox",
  "/Game/Maps/Rook/Rook": "Sunset",
  "/Game/Maps/Triad/Triad": "Haven",
};

const QUEUES_MAP: Record<string, string> = {
  unrated: "Unrated",
  competitive: "Competitive",
  swiftplay: "Swiftplay",
  spikerush: "Spike Rush",
  deathmatch: "Deathmatch",
  ggteam: "Escalation",
};

interface ChatSessionResponse {
  puuid: string;
}

interface Presence {
  puuid: string;
  private: string;
}

interface PresencesResponse {
  presences?: Presence[];
}

interface ValorantPrivatePresenceData {
  sessionLoopState?: string;
  partyId?: string;
  matchPresenceData?: {
    sessionLoopState?: string;
    matchMap?: string;
    queueId?: string;
  };
  partyPresenceData?: {
    partyOwnerSessionLoopState?: string;
    partyOwnerMatchScoreAllyTeam?: number;
    partyOwnerMatchScoreEnemyTeam?: number;
  };
  partyOwnerMatchScoreAllyTeam?: number;
  partyOwnerMatchScoreEnemyTeam?: number;
}

@Injectable()
export class ValorantLocalService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ValorantLocalService.name);
  private readonly lockfilePath: string;
  private readonly httpsAgent: https.Agent;
  private currentStatus: string = "CLOSED";
  private currentExtraData: Record<string, unknown> = {};
  private intervalId: NodeJS.Timeout;
  private allyScore: number = -1;
  private enemyScore: number = -1;
  private buyPhaseSecondsRemaining: number = 0;
  private buyPhaseInterval: NodeJS.Timeout | null = null;

  constructor(
    private readonly httpService: HttpService,
    private readonly gateway: ValorantGateway,
  ) {
    this.lockfilePath = path.join(
      process.env.LOCALAPPDATA || "",
      "Riot Games",
      "Riot Client",
      "Config",
      "lockfile",
    );
    this.httpsAgent = new https.Agent({ rejectUnauthorized: false });
  }

  onModuleInit() {
    this.logger.log("Starting Valorant radar...");
    this.intervalId = setInterval(() => {
      void this.checkStatus();
    }, 2000);
  }

  onModuleDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.logger.log("Valorant radar stopped.");
    }
    if (this.buyPhaseInterval) {
      clearInterval(this.buyPhaseInterval);
    }
  }

  private getCredentials() {
    if (!fs.existsSync(this.lockfilePath)) return null;

    const content = fs.readFileSync(this.lockfilePath, "utf8");
    const [, , port, password, protocol] = content.split(":");
    const authBase64 = Buffer.from(`riot:${password}`).toString("base64");

    return {
      url: `${protocol}://127.0.0.1:${port}`,
      token: `Basic ${authBase64}`,
    };
  }

  private async checkStatus() {
    const credentials = this.getCredentials();

    if (!credentials) {
      this.updateStatus("CLOSED");
      return;
    }

    const config = {
      headers: { Authorization: credentials.token },
      httpsAgent: this.httpsAgent,
    };

    try {
      const session = await firstValueFrom(
        this.httpService.get<ChatSessionResponse>(
          `${credentials.url}/chat/v1/session`,
          config,
        ),
      );
      const puuid = session.data.puuid;

      const presences = await firstValueFrom(
        this.httpService.get<PresencesResponse>(
          `${credentials.url}/chat/v4/presences`,
          config,
        ),
      );

      const myPresence = presences.data.presences?.find(
        (p) => p.puuid === puuid,
      );

      if (myPresence && myPresence.private) {
        const decodedJson = Buffer.from(myPresence.private, "base64").toString(
          "utf8",
        );
        const privateData = JSON.parse(
          decodedJson,
        ) as ValorantPrivatePresenceData;

        const loopState =
          privateData.matchPresenceData?.sessionLoopState ||
          privateData.partyPresenceData?.partyOwnerSessionLoopState ||
          privateData.sessionLoopState;

        if (loopState === "PREGAME") {
          this.clearBuyPhase();
          const matchId = privateData.partyId || "PRESENCE_LOBBY";
          this.updateStatus("PREGAME", { matchId });
        } else if (loopState === "INGAME") {
          const mapPath = privateData.matchPresenceData?.matchMap || "";
          const queueId = privateData.matchPresenceData?.queueId || "";
          const mapName = MAPS_MAP[mapPath] || "Unknown Map";
          const mode = QUEUES_MAP[queueId] || "Unknown Mode";
          this.updateStatus("INGAME", { mapName, mode });

          const scoreAlly =
            privateData.partyOwnerMatchScoreAllyTeam ??
            privateData.partyPresenceData?.partyOwnerMatchScoreAllyTeam ??
            0;
          const scoreEnemy =
            privateData.partyOwnerMatchScoreEnemyTeam ??
            privateData.partyPresenceData?.partyOwnerMatchScoreEnemyTeam ??
            0;

          if (this.allyScore === -1 && this.enemyScore === -1) {
            this.allyScore = scoreAlly;
            this.enemyScore = scoreEnemy;
            this.startBuyPhase(scoreAlly, scoreEnemy);
          } else if (
            this.allyScore !== scoreAlly ||
            this.enemyScore !== scoreEnemy
          ) {
            this.allyScore = scoreAlly;
            this.enemyScore = scoreEnemy;
            this.startBuyPhase(scoreAlly, scoreEnemy);
          }
        } else {
          this.clearBuyPhase();
          this.updateStatus("MENU");
        }
      } else {
        this.clearBuyPhase();
        this.updateStatus("MENU");
      }
    } catch {
      this.clearBuyPhase();
      this.updateStatus("CLOSED");
    }
  }

  private updateStatus(
    newStatus: string,
    extraData: Record<string, unknown> = {},
  ) {
    const statusChanged = this.currentStatus !== newStatus;
    const dataChanged =
      JSON.stringify(this.currentExtraData) !== JSON.stringify(extraData);

    if (statusChanged || dataChanged) {
      this.currentStatus = newStatus;
      this.currentExtraData = extraData;
      this.logger.log(
        `Status or details changed: ${newStatus} ${JSON.stringify(extraData)}`,
      );

      this.gateway.updateStatus(newStatus, extraData);
    }
  }

  private startBuyPhase(scoreAlly: number, scoreEnemy: number) {
    if (this.buyPhaseInterval) {
      clearInterval(this.buyPhaseInterval);
      this.buyPhaseInterval = null;
    }

    const round = scoreAlly + scoreEnemy + 1;
    const isSpecialRound = round === 1 || round === 13 || round >= 25;
    this.buyPhaseSecondsRemaining = isSpecialRound ? 45 : 30;

    this.logger.log(
      `New round detected! Round: ${round}. Starting buy phase of ${this.buyPhaseSecondsRemaining} seconds.`,
    );
    this.gateway.emitBuyPhaseStatus(true, this.buyPhaseSecondsRemaining, round);

    this.buyPhaseInterval = setInterval(() => {
      this.buyPhaseSecondsRemaining--;
      if (this.buyPhaseSecondsRemaining <= 0) {
        this.logger.log(`Buy phase ended for round ${round}.`);
        this.gateway.emitBuyPhaseStatus(false, 0, round);
        if (this.buyPhaseInterval) {
          clearInterval(this.buyPhaseInterval);
          this.buyPhaseInterval = null;
        }
      } else {
        this.gateway.emitBuyPhaseStatus(
          true,
          this.buyPhaseSecondsRemaining,
          round,
        );
      }
    }, 1000);
  }

  private clearBuyPhase() {
    this.allyScore = -1;
    this.enemyScore = -1;
    if (this.buyPhaseInterval) {
      clearInterval(this.buyPhaseInterval);
      this.buyPhaseInterval = null;
      this.gateway.emitBuyPhaseStatus(false, 0, 0);
    }
  }
}
