import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { AgentsController } from "./valorant_api/agents/agents.controller";
import { AgentsService } from "./valorant_api/agents/agents.service";
import { MapsController } from "./valorant_api/maps/maps.controller";
import { MapsService } from "./valorant_api/maps/maps.service";
import { GearController } from "./valorant_api/gear/gear.controller";
import { GearService } from "./valorant_api/gear/gear.service";
import { WeaponsController } from "./valorant_api/weapons/weapons.controller";
import { WeaponsService } from "./valorant_api/weapons/weapons.service";
import { GameModesController } from "./valorant_api/gamemodes/gamemodes.controller";
import { GameModesService } from "./valorant_api/gamemodes/gamemodes.service";
import { MatchesController } from "./valorant_api/matches/matches.controller";
import { MatchesService } from "./valorant_api/matches/matches.service";
import { ContentController } from "./valorant_api/content/content.controller";
import { ContentService } from "./valorant_api/content/content.service";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 20,
      },
    ]),
  ],
  controllers: [
    AgentsController,
    MapsController,
    GearController,
    WeaponsController,
    GameModesController,
    MatchesController,
    ContentController,
  ],
  providers: [
    AgentsService,
    MapsService,
    GearService,
    WeaponsService,
    GameModesService,
    MatchesService,
    ContentService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
