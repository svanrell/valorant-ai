import { Controller, Get } from "@nestjs/common";
import { GameModesService, GameMode } from "./gamemodes.service";
import { Observable } from "rxjs";

@Controller("gamemodes")
export class GameModesController {
  constructor(private readonly gameModesService: GameModesService) {}

  @Get()
  loadGameModes(): Observable<GameMode[]> {
    return this.gameModesService.loadGameModes();
  }
}
