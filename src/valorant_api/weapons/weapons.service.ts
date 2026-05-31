import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { map, Observable, tap } from "rxjs";
import { AxiosResponse } from "axios";
import { saveToCsv } from "../../utils/csv-helper";

export interface ValorantApiResponse {
  status: number;
  data: Weapon[];
}

export interface Weapon {
  uuid: string;
  displayName: string;
  category: string;
  defaultSkinUuid: string;
  displayIcon: string | null;
  killStreamIcon: string | null;
  assetPath: string;
  weaponStats: {
    fireRate: number;
    magazineSize: number;
    runSpeedMultiplier: number;
    equipTimeSeconds: number;
    reloadTimeSeconds: number;
    firstBulletAccuracy: number;
    shotgunPelletCount: number;
    wallPenetration: string;
    feature: string | null;
    fireMode: string | null;
    altFireType: string | null;
    adsStats: {
      zoomMultiplier: number;
      fireRate: number;
      runSpeedMultiplier: number;
      burstCount: number;
      firstBulletAccuracy: number;
    } | null;
    altShotgunStats: {
      shotgunPelletCount: number;
      burstRate: number;
    } | null;
    airBurstStats: {
      shotgunPelletCount: number;
      burstDistance: number;
    } | null;
    damageRanges: {
      rangeStartMeters: number;
      rangeEndMeters: number;
      headDamage: number;
      bodyDamage: number;
      legDamage: number;
    }[];
  } | null;
  shopData: {
    cost: number;
    category: string;
    shopOrderPriority: number;
    categoryText: string;
    gridPosition: {
      row: number;
      column: number;
    } | null;
    canBeTrashed: boolean;
    image: string | null;
    newImage: string | null;
    newImage2: string | null;
    assetPath: string;
  } | null;
  skins: {
    uuid: string;
    displayName: string;
    themeUuid: string;
    contentTierUuid: string | null;
    displayIcon: string | null;
    wallpaper: string | null;
    assetPath: string;
    chromas: {
      uuid: string;
      displayName: string;
      displayIcon: string | null;
      fullRender: string;
      swatch: string | null;
      streamedVideo: string | null;
      assetPath: string;
    }[];
    levels: {
      uuid: string;
      displayName: string;
      levelItem: string | null;
      displayIcon: string | null;
      streamedVideo: string | null;
      assetPath: string;
    }[];
  }[];
}

@Injectable()
export class WeaponsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  loadWeapons(): Observable<Weapon[]> {
    const apiUrl =
      this.configService.get<string>("VALORANT_API_WEAPONS_URL") ||
      "https://valorant-api.com/v1/weapons";

    return this.httpService.get<ValorantApiResponse>(apiUrl).pipe(
      map((response: AxiosResponse<ValorantApiResponse>) => {
        const allWeapons = response.data.data;

        return allWeapons.map((weapon: Weapon) => {
          return {
            uuid: weapon.uuid,
            displayName: weapon.displayName,
            category: weapon.category,
            defaultSkinUuid: weapon.defaultSkinUuid,
            displayIcon: weapon.displayIcon,
            killStreamIcon: weapon.killStreamIcon,
            assetPath: weapon.assetPath,
            weaponStats: weapon.weaponStats
              ? {
                  fireRate: weapon.weaponStats.fireRate,
                  magazineSize: weapon.weaponStats.magazineSize,
                  runSpeedMultiplier: weapon.weaponStats.runSpeedMultiplier,
                  equipTimeSeconds: weapon.weaponStats.equipTimeSeconds,
                  reloadTimeSeconds: weapon.weaponStats.reloadTimeSeconds,
                  firstBulletAccuracy: weapon.weaponStats.firstBulletAccuracy,
                  shotgunPelletCount: weapon.weaponStats.shotgunPelletCount,
                  wallPenetration: weapon.weaponStats.wallPenetration,
                  feature: weapon.weaponStats.feature,
                  fireMode: weapon.weaponStats.fireMode,
                  altFireType: weapon.weaponStats.altFireType,
                  adsStats: weapon.weaponStats.adsStats
                    ? {
                        zoomMultiplier:
                          weapon.weaponStats.adsStats.zoomMultiplier,
                        fireRate: weapon.weaponStats.adsStats.fireRate,
                        runSpeedMultiplier:
                          weapon.weaponStats.adsStats.runSpeedMultiplier,
                        burstCount: weapon.weaponStats.adsStats.burstCount,
                        firstBulletAccuracy:
                          weapon.weaponStats.adsStats.firstBulletAccuracy,
                      }
                    : null,
                  altShotgunStats: weapon.weaponStats.altShotgunStats
                    ? {
                        shotgunPelletCount:
                          weapon.weaponStats.altShotgunStats.shotgunPelletCount,
                        burstRate: weapon.weaponStats.altShotgunStats.burstRate,
                      }
                    : null,
                  airBurstStats: weapon.weaponStats.airBurstStats
                    ? {
                        shotgunPelletCount:
                          weapon.weaponStats.airBurstStats.shotgunPelletCount,
                        burstDistance:
                          weapon.weaponStats.airBurstStats.burstDistance,
                      }
                    : null,
                  damageRanges: Array.isArray(weapon.weaponStats.damageRanges)
                    ? weapon.weaponStats.damageRanges.map((range) => ({
                        rangeStartMeters: range.rangeStartMeters,
                        rangeEndMeters: range.rangeEndMeters,
                        headDamage: range.headDamage,
                        bodyDamage: range.bodyDamage,
                        legDamage: range.legDamage,
                      }))
                    : [],
                }
              : null,
            shopData: weapon.shopData
              ? {
                  cost: weapon.shopData.cost,
                  category: weapon.shopData.category,
                  shopOrderPriority: weapon.shopData.shopOrderPriority,
                  categoryText: weapon.shopData.categoryText,
                  gridPosition: weapon.shopData.gridPosition
                    ? {
                        row: weapon.shopData.gridPosition.row,
                        column: weapon.shopData.gridPosition.column,
                      }
                    : null,
                  canBeTrashed: weapon.shopData.canBeTrashed,
                  image: weapon.shopData.image,
                  newImage: weapon.shopData.newImage,
                  newImage2: weapon.shopData.newImage2,
                  assetPath: weapon.shopData.assetPath,
                }
              : null,
            skins: Array.isArray(weapon.skins)
              ? weapon.skins
                  .filter((skin) => skin.uuid === weapon.defaultSkinUuid)
                  .map((skin) => ({
                    uuid: skin.uuid,
                    displayName: skin.displayName,
                    themeUuid: skin.themeUuid,
                    contentTierUuid: skin.contentTierUuid,
                    displayIcon: skin.displayIcon,
                    wallpaper: skin.wallpaper,
                    assetPath: skin.assetPath,
                    chromas: Array.isArray(skin.chromas)
                      ? skin.chromas.map((chroma) => ({
                          uuid: chroma.uuid,
                          displayName: chroma.displayName,
                          displayIcon: chroma.displayIcon,
                          fullRender: chroma.fullRender,
                          swatch: chroma.swatch,
                          streamedVideo: chroma.streamedVideo,
                          assetPath: chroma.assetPath,
                        }))
                      : [],
                    levels: Array.isArray(skin.levels)
                      ? skin.levels.map((level) => ({
                          uuid: level.uuid,
                          displayName: level.displayName,
                          levelItem: level.levelItem,
                          displayIcon: level.displayIcon,
                          streamedVideo: level.streamedVideo,
                          assetPath: level.assetPath,
                        }))
                      : [],
                  }))
              : [],
          };
        });
      }),
      tap((weapons) => {
        saveToCsv(
          "weapons.csv",
          weapons,
          [
            "uuid",
            "displayName",
            "category",
            "cost",
            "fireRate",
            "magazineSize",
            "runSpeedMultiplier",
            "equipTimeSeconds",
            "reloadTimeSeconds",
            "firstBulletAccuracy",
            "wallPenetration",
          ],
          (w) => [
            w.uuid,
            w.displayName,
            w.category,
            w.shopData ? w.shopData.cost : 0,
            w.weaponStats ? w.weaponStats.fireRate : 0,
            w.weaponStats ? w.weaponStats.magazineSize : 0,
            w.weaponStats ? w.weaponStats.runSpeedMultiplier : 0,
            w.weaponStats ? w.weaponStats.equipTimeSeconds : 0,
            w.weaponStats ? w.weaponStats.reloadTimeSeconds : 0,
            w.weaponStats ? w.weaponStats.firstBulletAccuracy : 0,
            w.weaponStats ? w.weaponStats.wallPenetration : "",
          ],
        );
      }),
    );
  }
}
