import { Controller, Get, Query } from "@nestjs/common";
import { ContentService, ContentDto, ActDto } from "./content.service";
import { Observable } from "rxjs";

@Controller("content")
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  loadContent(@Query("locale") locale?: string): Observable<ContentDto> {
    return this.contentService.loadContent(locale);
  }

  @Get("active-act")
  getActiveAct(): Observable<ActDto | null> {
    return this.contentService.getActiveAct();
  }
}
