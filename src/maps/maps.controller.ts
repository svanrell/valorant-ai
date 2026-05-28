import { Controller, Get } from "@nestjs/common";
import { MapsService, MapData } from "./maps.service";
import { Observable } from "rxjs";

@Controller("maps")
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Get()
  loadMaps(): Observable<MapData[]> {
    return this.mapsService.loadMaps();
  }
}
