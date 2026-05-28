import { Controller, Get } from "@nestjs/common";
import { AgentsService, Agent } from "./agents.service";
import { Observable } from "rxjs";

@Controller("agents")
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get()
  loadAgents(): Observable<Agent[]> {
    return this.agentsService.loadAgents();
  }
}
