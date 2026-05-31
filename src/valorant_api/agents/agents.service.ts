import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { map, Observable, tap } from "rxjs";
import { AxiosResponse } from "axios";
import { saveToCsv } from "../../utils/csv-helper";

interface ValorantApiResponse {
  status: number;
  data: Agent[];
}

export interface Ability {
  slot: string;
  displayName: string;
  description: string;
  displayIcon: string;
}

export interface Role {
  displayName: string;
  description: string;
  displayIcon: string;
}

export interface Agent {
  abilities: Ability[];
  background: string;
  description: string;
  developerName: string;
  displayIcon: string;
  displayName: string;
  fullPortrait: string;
  isPlayableCharacter: boolean;
  killfeedPortrait: string;
  role: Role | null;
  uuid: string;
}

@Injectable()
export class AgentsService {
  constructor(private readonly httpService: HttpService) { }

  loadAgents(): Observable<Agent[]> {
    const apiUrl = "https://valorant-api.com/v1/agents";

    return this.httpService.get<ValorantApiResponse>(apiUrl).pipe(
      map((response: AxiosResponse<ValorantApiResponse>) => {
        const allAgents = response.data.data;

        const playable = allAgents.filter(
          (p: Agent) => p.isPlayableCharacter === true,
        );

        return playable.map((agent: Agent) => {
          return {
            uuid: agent.uuid,
            displayName: agent.displayName,
            description: agent.description,
            developerName: agent.developerName,
            displayIcon: agent.displayIcon,
            fullPortrait: agent.fullPortrait,
            background: agent.background,
            killfeedPortrait: agent.killfeedPortrait,
            isPlayableCharacter: agent.isPlayableCharacter,
            role: agent.role
              ? {
                displayName: agent.role.displayName,
                description: agent.role.description,
                displayIcon: agent.role.displayIcon,
              }
              : null,
            abilities: agent.abilities
              ? agent.abilities.map((ability) => ({
                slot: ability.slot,
                displayName: ability.displayName,
                description: ability.description,
                displayIcon: ability.displayIcon,
              }))
              : [],
          };
        });
      }),
      tap((agents) => {
        saveToCsv(
          "agents.csv",
          agents,
          [
            "uuid",
            "displayName",
            "description",
            "developerName",
            "roleName",
            "roleDescription",
          ],
          (p) => [
            p.uuid,
            p.displayName,
            p.description,
            p.developerName,
            p.role ? p.role.displayName : "",
            p.role ? p.role.description : "",
          ],
        );
      }),
    );
  }
}
