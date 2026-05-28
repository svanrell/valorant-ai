import { Controller, Get } from "@nestjs/common";
import { GearService, Gear } from "./gear.service";
import { Observable } from "rxjs";

@Controller("gear")
export class GearController {
  constructor(private readonly gearService: GearService) {}

  @Get()
  loadGear(): Observable<Gear[]> {
    return this.gearService.loadGear();
  }
}
