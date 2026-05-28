import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { App } from "supertest/types";
import { AppModule } from "./../src/app.module";
import { HttpService } from "@nestjs/axios";
import { of } from "rxjs";
import * as fs from "fs";
import * as path from "path";

describe("Valorant API App (e2e)", () => {
  let app: INestApplication<App>;

  const mockHttpService = {
    get: jest.fn((url: string) => {
      if (url.includes("/agents")) {
        return of({
          data: {
            status: 200,
            data: [
              {
                uuid: "agent-1",
                displayName: "Jett",
                description: "Wind agent",
                developerName: "Wushu",
                displayIcon: "icon-url",
                fullPortrait: "portrait-url",
                background: "bg-url",
                killfeedPortrait: "killfeed-url",
                isPlayableCharacter: true,
                role: {
                  displayName: "Duelist",
                  description: "Entry fragger",
                  displayIcon: "role-icon-url",
                },
                abilities: [
                  {
                    slot: "Ability1",
                    displayName: "Cloudburst",
                    description: "Smoke cloud",
                    displayIcon: "ability-icon-url",
                  },
                ],
              },
            ],
          },
        });
      } else if (url.includes("/maps")) {
        return of({
          data: {
            status: 200,
            data: [
              {
                uuid: "map-1",
                displayName: "Ascent",
                narrativeDescription: "Narrative",
                tacticalDescription: "Tactical",
                coordinates: "Coords",
                displayIcon: "icon-url",
                listViewIcon: "list-url",
                listViewIconTall: "tall-url",
                splash: "splash-url",
                stylizedBackgroundImage: "bg-url",
                premierBackgroundImage: "premier-url",
                assetPath: "path",
                mapUrl: "url",
                xMultiplier: 1.2,
                yMultiplier: 1.2,
                xScalarToAdd: 0.5,
                yScalarToAdd: 0.5,
                callouts: [],
              },
            ],
          },
        });
      } else if (url.includes("/gear")) {
        return of({
          data: {
            status: 200,
            data: [
              {
                uuid: "gear-1",
                displayName: "Heavy Shield",
                description: "Adds 50 HP",
                descriptions: [],
                details: [
                  { name: "damageReduction", value: "66%" },
                  { name: "damageAbsorbed", value: "50" },
                ],
                displayIcon: "icon-url",
                shopData: {
                  cost: 1000,
                  category: "Gear",
                  categoryText: "Armor",
                  newImage: "img-url",
                },
              },
            ],
          },
        });
      } else if (url.includes("/weapons")) {
        return of({
          data: {
            status: 200,
            data: [
              {
                uuid: "weapon-1",
                displayName: "Vandal",
                category: "Rifles",
                defaultSkinUuid: "skin-1",
                displayIcon: "icon-url",
                killStreamIcon: "kill-url",
                assetPath: "path",
                weaponStats: {
                  fireRate: 9.75,
                  magazineSize: 25,
                  runSpeedMultiplier: 0.85,
                  equipTimeSeconds: 1.0,
                  reloadTimeSeconds: 2.5,
                  firstBulletAccuracy: 0.25,
                  shotgunPelletCount: 1,
                  wallPenetration: "High",
                  feature: null,
                  fireMode: null,
                  altFireType: null,
                  adsStats: null,
                  altShotgunStats: null,
                  airBurstStats: null,
                  damageRanges: [],
                },
                shopData: {
                  cost: 2900,
                  category: "Rifles",
                  shopOrderPriority: 1,
                  categoryText: "Rifles",
                  gridPosition: null,
                  canBeTrashed: true,
                  image: null,
                  newImage: null,
                  newImage2: null,
                  assetPath: "path",
                },
                skins: [
                  {
                    uuid: "skin-1",
                    displayName: "Vandal",
                    themeUuid: "theme-1",
                    contentTierUuid: null,
                    displayIcon: "icon-url",
                    wallpaper: null,
                    assetPath: "path",
                    chromas: [],
                    levels: [],
                  },
                ],
              },
            ],
          },
        });
      } else if (url.includes("/contents")) {
        return of({
          data: {
            version: "9.0",
            acts: [
              {
                id: "act-active-id",
                name: "ACT III",
                isActive: true,
                type: "act",
              },
              {
                id: "act-inactive-id",
                name: "ACT II",
                isActive: false,
                type: "act",
              },
            ],
          },
        });
      } else if (url.includes("/gamemodes")) {
        return of({
          data: {
            status: 200,
            data: [
              {
                uuid: "mode-1",
                displayName: "Competitive",
                description: "Standard mode",
                duration: "40 min",
                economyType: "Dynamic",
                allowsMatchTimeouts: true,
                allowsCustomGameReplays: true,
                isTeamVoiceAllowed: true,
                isMinimapHidden: false,
                orbCount: 0,
                roundsPerHalf: 12,
                teamRoles: null,
                gameFeatureOverrides: null,
                gameRuleBoolOverrides: null,
                displayIcon: null,
                listViewIconTall: null,
                assetPath: "path",
              },
            ],
          },
        });
      } else if (url.includes("/leaderboards/by-act/")) {
        return of({
          data: {
            shard: "eu",
            actId: "act-active-id",
            totalPlayers: 1,
            players: [
              {
                puuid: "player-1",
                gameName: "PlayerOne",
                tagLine: "EUW",
                leaderboardRank: 1,
                rankedRating: 950,
                numberOfWins: 45,
              },
            ],
          },
        });
      } else if (url.includes("/matches/")) {
        return of({
          data: {
            matchInfo: {
              matchId: "match-uuid-1",
              mapId: "map-1",
              gameLengthMillis: 2000000,
              gameStartMillis: 1600000000000,
              provisioningFlowId: "Matchmaking",
              isCompleted: true,
              queueId: "competitive",
              gameMode: "mode-1",
              isRanked: true,
              seasonId: "act-active-id",
            },
            players: [
              {
                subject: "player-1",
                gameName: "PlayerOne",
                tagLine: "EUW",
                teamId: "Blue",
                characterId: "agent-1",
                stats: {
                  score: 5000,
                  roundsPlayed: 24,
                  kills: 25,
                  deaths: 12,
                  assists: 5,
                },
                competitiveTier: 24,
              },
            ],
            teams: [],
            roundResults: [
              {
                roundNum: 1,
                roundResult: "Elimination",
                winningTeam: "Blue",
                bombPlanter: undefined,
                bombDefuser: undefined,
                playerStats: [
                  {
                    subject: "player-1",
                    score: 300,
                    economy: {
                      loadoutValue: 3900,
                      weapon: "Vandal",
                      armor: "Heavy Armor",
                      remaining: 200,
                      spent: 3100,
                    },
                    wasAfk: false,
                    wasPenalized: false,
                  },
                ],
              },
            ],
          },
        });
      }
      return of({ data: {} });
    }),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(HttpService)
      .useValue(mockHttpService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it("/agents (GET)", async () => {
    const res = await request(app.getHttpServer()).get("/agents").expect(200);

    const body = res.body as { displayName: string }[];
    expect(body).toBeDefined();
    expect(body[0].displayName).toBe("Jett");
    expect(
      fs.existsSync(path.join(process.cwd(), "infoApi", "agents.csv")),
    ).toBe(true);
  });

  it("/maps (GET)", async () => {
    const res = await request(app.getHttpServer()).get("/maps").expect(200);

    const body = res.body as { displayName: string }[];
    expect(body).toBeDefined();
    expect(body[0].displayName).toBe("Ascent");
    expect(fs.existsSync(path.join(process.cwd(), "infoApi", "maps.csv"))).toBe(
      true,
    );
  });

  it("/gear (GET)", async () => {
    const res = await request(app.getHttpServer()).get("/gear").expect(200);

    const body = res.body as { displayName: string }[];
    expect(body).toBeDefined();
    expect(body[0].displayName).toBe("Heavy Shield");
    expect(fs.existsSync(path.join(process.cwd(), "infoApi", "gear.csv"))).toBe(
      true,
    );
  });

  it("/weapons (GET)", async () => {
    const res = await request(app.getHttpServer()).get("/weapons").expect(200);

    const body = res.body as { displayName: string }[];
    expect(body).toBeDefined();
    expect(body[0].displayName).toBe("Vandal");
    expect(
      fs.existsSync(path.join(process.cwd(), "infoApi", "weapons.csv")),
    ).toBe(true);
  });

  it("/content (GET)", async () => {
    const res = await request(app.getHttpServer()).get("/content").expect(200);

    const body = res.body as { acts: unknown[] };
    expect(body).toBeDefined();
    expect(body.acts).toBeDefined();
    expect(fs.existsSync(path.join(process.cwd(), "infoApi", "acts.csv"))).toBe(
      true,
    );
  });

  it("/content/active-act (GET)", async () => {
    const res = await request(app.getHttpServer())
      .get("/content/active-act")
      .expect(200);

    const body = res.body as { name: string };
    expect(body).toBeDefined();
    expect(body.name).toBe("ACT III");
  });

  it("/gamemodes (GET)", async () => {
    const res = await request(app.getHttpServer())
      .get("/gamemodes")
      .expect(200);

    const body = res.body as { displayName: string }[];
    expect(body).toBeDefined();
    expect(body[0].displayName).toBe("Competitive");
    expect(
      fs.existsSync(path.join(process.cwd(), "infoApi", "game_modes.csv")),
    ).toBe(true);
  });

  it("/matches/leaderboard/active (GET)", async () => {
    const res = await request(app.getHttpServer())
      .get("/matches/leaderboard/active")
      .expect(200);

    const body = res.body as { players: { gameName: string }[] };
    expect(body).toBeDefined();
    expect(body.players[0].gameName).toBe("PlayerOne");
    expect(
      fs.existsSync(
        path.join(process.cwd(), "infoApi", "ranked_leaderboard.csv"),
      ),
    ).toBe(true);
  });

  it("/matches/details/:matchId (GET)", async () => {
    const res = await request(app.getHttpServer())
      .get("/matches/details/match-uuid-1")
      .expect(200);

    const body = res.body as { matchInfo: { matchId: string } };
    expect(body).toBeDefined();
    expect(body.matchInfo.matchId).toBe("match-uuid-1");

    expect(
      fs.existsSync(path.join(process.cwd(), "infoApi", "match_metadata.csv")),
    ).toBe(true);
    expect(
      fs.existsSync(path.join(process.cwd(), "infoApi", "match_players.csv")),
    ).toBe(true);
    expect(
      fs.existsSync(path.join(process.cwd(), "infoApi", "match_rounds.csv")),
    ).toBe(true);
    expect(
      fs.existsSync(
        path.join(process.cwd(), "infoApi", "match_round_purchases.csv"),
      ),
    ).toBe(true);
  });
});
