import { Promotion } from "./promotion.model";

export interface PromotionParamBuild extends Promotion {
    page:number;
    size: number;
    discountMin: number;
    discountMax: number;
    status: boolean;

}