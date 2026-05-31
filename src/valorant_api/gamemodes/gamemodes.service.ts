import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { map, Observable, tap } from "rxjs";
import { AxiosResponse } from "axios";
import { saveToCsv } from "../utils/csv-helper";

export interface ValorantApiResponse {
  status: number;
  data: GameMode[];
}

export interface GameFeatureOverride {
  featureName: string;
  state: boolean;
}

export interface GameRuleBoolOverride {
  ruleName: string;
  state: boolean;
}

export interface GameMode {
  uuid: string;
  displayName: string;
  description: string | null;
  duration: string | null;
  economyType: string | null;
  allowsMatchTimeouts: boolean;
  allowsCustomGameReplays: boolean;
  isTeamVoiceAllowed: boolean;
  isMinimapHidden: boolean;
  orbCount: number;
  roundsPerHalf: number;
  teamRoles: string[] | null;
  gameFeatureOverrides: GameFeatureOverride[] | null;
  gameRuleBoolOverrides: GameRuleBoolOverride[] | null;
  displayIcon: string | null;
  listViewIconTall: string | null;
  assetPath: string;
}

@Injectable()
export class GameModesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  loadGameModes(): Observable<GameMode[]> {
    const apiUrl =
      this.configService.get<string>("VALORANT_API_GAMEMODES_URL") ||
      "https://valorant-api.com/v1/gamemodes";

    return this.httpService.get<ValorantApiResponse>(apiUrl).pipe(
      map((response: AxiosResponse<ValorantApiResponse>) => {
        const allGameModes = response.data.data;

        return allGameModes.map((gameMode: GameMode) => {
          return {
            uuid: gameMode.uuid,
            displayName: gameMode.displayName,
            description: gameMode.description,
            duration: gameMode.duration,
            economyType: gameMode.economyType,
            allowsMatchTimeouts: gameMode.allowsMatchTimeouts,
            allowsCustomGameReplays: gameMode.allowsCustomGameReplays,
            isTeamVoiceAllowed: gameMode.isTeamVoiceAllowed,
            isMinimapHidden: gameMode.isMinimapHidden,
            orbCount: gameMode.orbCount,
            roundsPerHalf: gameMode.roundsPerHalf,
            teamRoles: Array.isArray(gameMode.teamRoles)
              ? gameMode.teamRoles
              : null,
            gameFeatureOverrides: Array.isArray(gameMode.gameFeatureOverrides)
              ? gameMode.gameFeatureOverrides.map((f) => ({
                  featureName: f.featureName,
                  state: f.state,
                }))
              : null,
            gameRuleBoolOverrides: Array.isArray(gameMode.gameRuleBoolOverrides)
              ? gameMode.gameRuleBoolOverrides.map((r) => ({
                  ruleName: r.ruleName,
                  state: r.state,
                }))
              : null,
            displayIcon: gameMode.displayIcon,
            listViewIconTall: gameMode.listViewIconTall,
            assetPath: gameMode.assetPath,
          };
        });
      }),
      tap((gameModes) => {
        saveToCsv(
          "game_modes.csv",
          gameModes,
          [
            "uuid",
            "displayName",
            "description",
            "duration",
            "economyType",
            "allowsMatchTimeouts",
            "allowsCustomGameReplays",
            "isTeamVoiceAllowed",
            "isMinimapHidden",
            "orbCount",
            "roundsPerHalf",
          ],
          (m) => [
            m.uuid,
            m.displayName,
            m.description || "",
            m.duration || "",
            m.economyType || "",
            m.allowsMatchTimeouts,
            m.allowsCustomGameReplays,
            m.isTeamVoiceAllowed,
            m.isMinimapHidden,
            m.orbCount,
            m.roundsPerHalf,
          ],
        );
      }),
    );
  }
}
