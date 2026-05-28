import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { map, Observable, tap } from "rxjs";
import { AxiosResponse } from "axios";
import { saveToCsv } from "../utils/csv-helper";

export interface ValorantApiResponse {
  status: number;
  data: MapData[];
}

export interface Location3D {
  x: number;
  y: number;
  z: number;
}

export interface Rotation3D {
  pitch: number;
  yaw: number;
  roll: number;
}

export interface Callout {
  regionName: string;
  superRegion: string;
  superRegionName: string;
  location: Location3D;
  scale3D: Location3D | null;
  rotation: Rotation3D | null;
}

export interface MapData {
  uuid: string;
  displayName: string;
  narrativeDescription: string | null;
  tacticalDescription: string | null;
  coordinates: string;
  displayIcon: string | null;
  listViewIcon: string;
  listViewIconTall: string;
  splash: string;
  stylizedBackgroundImage: string | null;
  premierBackgroundImage: string | null;
  assetPath: string;
  mapUrl: string;
  xMultiplier: number;
  yMultiplier: number;
  xScalarToAdd: number;
  yScalarToAdd: number;
  callouts: Callout[] | null;
}

@Injectable()
export class MapsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  loadMaps(): Observable<MapData[]> {
    const apiUrl =
      this.configService.get<string>("VALORANT_API_MAPS_URL") ||
      "https://valorant-api.com/v1/maps";

    return this.httpService.get<ValorantApiResponse>(apiUrl).pipe(
      map((response: AxiosResponse<ValorantApiResponse>) => {
        const allMaps = response.data.data;
        return allMaps.map((mapItem: MapData) => {
          return {
            uuid: mapItem.uuid,
            displayName: mapItem.displayName,
            narrativeDescription: mapItem.narrativeDescription,
            tacticalDescription: mapItem.tacticalDescription,
            coordinates: mapItem.coordinates,
            displayIcon: mapItem.displayIcon,
            listViewIcon: mapItem.listViewIcon,
            listViewIconTall: mapItem.listViewIconTall,
            splash: mapItem.splash,
            stylizedBackgroundImage: mapItem.stylizedBackgroundImage,
            premierBackgroundImage: mapItem.premierBackgroundImage,
            assetPath: mapItem.assetPath,
            mapUrl: mapItem.mapUrl,
            xMultiplier: mapItem.xMultiplier,
            yMultiplier: mapItem.yMultiplier,
            xScalarToAdd: mapItem.xScalarToAdd,
            yScalarToAdd: mapItem.yScalarToAdd,
            callouts: mapItem.callouts
              ? mapItem.callouts.map((callout) => ({
                  regionName: callout.regionName,
                  superRegion: callout.superRegion,
                  superRegionName: callout.superRegionName,
                  location: {
                    x: callout.location.x,
                    y: callout.location.y,
                    z: callout.location.z,
                  },
                  scale3D: callout.scale3D
                    ? {
                        x: callout.scale3D.x,
                        y: callout.scale3D.y,
                        z: callout.scale3D.z,
                      }
                    : null,
                  rotation: callout.rotation
                    ? {
                        pitch: callout.rotation.pitch,
                        yaw: callout.rotation.yaw,
                        roll: callout.rotation.roll,
                      }
                    : null,
                }))
              : null,
          };
        });
      }),
      tap((maps) => {
        saveToCsv(
          "maps.csv",
          maps,
          [
            "uuid",
            "displayName",
            "narrativeDescription",
            "tacticalDescription",
            "coordinates",
            "xMultiplier",
            "yMultiplier",
            "xScalarToAdd",
            "yScalarToAdd",
          ],
          (m) => [
            m.uuid,
            m.displayName,
            m.narrativeDescription || "",
            m.tacticalDescription || "",
            m.coordinates || "",
            m.xMultiplier,
            m.yMultiplier,
            m.xScalarToAdd,
            m.yScalarToAdd,
          ],
        );
      }),
    );
  }
}
