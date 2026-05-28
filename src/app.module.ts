import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { AgentsController } from "./agents/agents.controller";
import { AgentsService } from "./agents/agents.service";
import { MapsController } from "./maps/maps.controller";
import { MapsService } from "./maps/maps.service";
import { GearController } from "./gear/gear.controller";
import { GearService } from "./gear/gear.service";
import { WeaponsController } from "./weapons/weapons.controller";
import { WeaponsService } from "./weapons/weapons.service";
import { GameModesController } from "./gamemodes/gamemodes.controller";
import { GameModesService } from "./gamemodes/gamemodes.service";
import { MatchesController } from "./matches/matches.controller";
import { MatchesService } from "./matches/matches.service";
import { ContentController } from "./content/content.controller";
import { ContentService } from "./content/content.service";

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
