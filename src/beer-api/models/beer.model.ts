import { BeerType } from "../enums/beer-type.enum";

export interface Beer {
    id?: string;
    name: string;
    beerType: BeerType;
    rating?: number;
}