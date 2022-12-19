import { Promotion } from "./promotion.model";

export interface PromotionParamBuild extends Promotion {
    page:number;
    size: number;

}