import { Controller, Get } from "@nestjs/common";
import { WeaponsService, Weapon } from "./weapons.service";
import { Observable } from "rxjs";

@Controller("weapons")
export class WeaponsController {
  constructor(private readonly weaponsService: WeaponsService) {}

  @Get()
  loadWeapons(): Observable<Weapon[]> {
    return this.weaponsService.loadWeapons();
  }
}
