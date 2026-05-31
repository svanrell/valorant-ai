import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { map, Observable, tap } from "rxjs";
import { AxiosResponse } from "axios";
import { saveToCsv } from "../../utils/csv-helper";

export interface ValorantApiResponse {
  status: number;
  data: Gear[];
}

export interface GearDetail {
  name: string;
  value: string;
}

export interface GearShopData {
  cost: number;
  category: string;
  categoryText: string;
  newImage: string | null;
}

export interface Gear {
  uuid: string;
  displayName: string;
  description: string;
  descriptions: string[];
  details: GearDetail[] | null;
  displayIcon: string | null;
  shopData: GearShopData | null;
}

@Injectable()
export class GearService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  loadGear(): Observable<Gear[]> {
    const apiUrl =
      this.configService.get<string>("VALORANT_API_GEAR_URL") ||
      "https://valorant-api.com/v1/gear";

    return this.httpService.get<ValorantApiResponse>(apiUrl).pipe(
      map((response: AxiosResponse<ValorantApiResponse>) => {
        const allGear = response.data.data;

        return allGear.map((gearItem: Gear) => {
          return {
            uuid: gearItem.uuid,
            displayName: gearItem.displayName,
            description: gearItem.description,
            descriptions: Array.isArray(gearItem.descriptions)
              ? gearItem.descriptions.filter(
                  (desc): desc is string => typeof desc === "string",
                )
              : [],
            details: Array.isArray(gearItem.details)
              ? gearItem.details.map((detail) => ({
                  name: detail.name,
                  value: detail.value,
                }))
              : null,
            displayIcon: gearItem.displayIcon,
            shopData: gearItem.shopData
              ? {
                  cost: gearItem.shopData.cost,
                  category: gearItem.shopData.category,
                  categoryText: gearItem.shopData.categoryText,
                  newImage: gearItem.shopData.newImage,
                }
              : null,
          };
        });
      }),
      tap((gear) => {
        saveToCsv(
          "gear.csv",
          gear,
          [
            "uuid",
            "displayName",
            "description",
            "cost",
            "categoryText",
            "damageReduction",
            "damageAbsorbed",
          ],
          (g) => [
            g.uuid,
            g.displayName,
            g.description,
            g.shopData ? g.shopData.cost : 0,
            g.shopData ? g.shopData.categoryText : "",
            g.details && g.details[0] ? g.details[0].value : "",
            g.details && g.details[1] ? g.details[1].value : "",
          ],
        );
      }),
    );
  }
}
