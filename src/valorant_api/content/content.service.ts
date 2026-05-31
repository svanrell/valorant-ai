import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { map, Observable, tap } from "rxjs";
import { AxiosResponse } from "axios";
import { saveToCsv } from "../../utils/csv-helper";

export interface LocalizedNamesDto {
  "ar-AE"?: string;
  "de-DE"?: string;
  "en-GB"?: string;
  "en-US"?: string;
  "es-ES"?: string;
  "es-MX"?: string;
  "fr-FR"?: string;
  "id-ID"?: string;
  "it-IT"?: string;
  "ja-JP"?: string;
  "ko-KR"?: string;
  "pl-PL"?: string;
  "pt-BR"?: string;
  "ru-RU"?: string;
  "th-TH"?: string;
  "tr-TR"?: string;
  "vi-VN"?: string;
  "zh-CN"?: string;
  "zh-TW"?: string;
}

export interface ActDto {
  name: string;
  localizedNames?: LocalizedNamesDto;
  id: string;
  isActive: boolean;
  type?: string;
}

export interface ContentItemDto {
  name: string;
  localizedNames?: LocalizedNamesDto;
  id: string;
  assetName: string;
  assetPath?: string;
}

export interface ContentDto {
  version: string;
  acts: ActDto[];
  characters?: ContentItemDto[];
  maps?: ContentItemDto[];
  gameModes?: ContentItemDto[];
}

@Injectable()
export class ContentService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  loadContent(locale?: string): Observable<ContentDto> {
    const apiKey =
      this.configService.get<string>("VALORANT_API_KEY") ||
      this.configService.get<string>("RIOT_API_KEY") ||
      "";
    const region = this.configService.get<string>("VALORANT_REGION") || "eu";

    const apiUrl = `https://${region}.api.riotgames.com/val/content/v1/contents`;

    return this.httpService
      .get<ContentDto>(apiUrl, {
        headers: {
          "X-Riot-Token": apiKey,
        },
        params: locale ? { locale } : {},
      })
      .pipe(
        map((response: AxiosResponse<ContentDto>) => response.data),
        tap((content: ContentDto) => {
          if (content && Array.isArray(content.acts)) {
            saveToCsv(
              "acts.csv",
              content.acts,
              ["id", "name", "isActive"],
              (act: ActDto) => [act.id, act.name, act.isActive ? "YES" : "NO"],
            );
          }
        }),
      );
  }

  getActiveAct(): Observable<ActDto | null> {
    return this.loadContent().pipe(
      map((content: ContentDto) => {
        if (content && Array.isArray(content.acts)) {
          const activeAct = content.acts.find(
            (act) => act.type === "act" && act.isActive === true,
          );
          return activeAct || null;
        }
        return null;
      }),
    );
  }
}
