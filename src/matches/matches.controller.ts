import { Controller, Get, Param, Query } from "@nestjs/common";
import { MatchesService, LeaderboardDto, MatchDto } from "./matches.service";
import { Observable } from "rxjs";

@Controller("matches")
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get("details/:matchId")
  loadMatch(@Param("matchId") matchId: string): Observable<MatchDto> {
    return this.matchesService.loadMatch(matchId);
  }

  @Get("leaderboard/active")
  loadActiveLeaderboard(
    @Query("size") size?: number,
    @Query("startIndex") startIndex?: number,
  ): Observable<LeaderboardDto> {
    return this.matchesService.loadActiveLeaderboard(
      size ? Number(size) : undefined,
      startIndex ? Number(startIndex) : undefined,
    );
  }

  @Get("leaderboard/:actId")
  loadLeaderboard(
    @Param("actId") actId: string,
    @Query("size") size?: number,
    @Query("startIndex") startIndex?: number,
  ): Observable<LeaderboardDto> {
    return this.matchesService.loadLeaderboard(
      actId,
      size ? Number(size) : undefined,
      startIndex ? Number(startIndex) : undefined,
    );
  }
}
