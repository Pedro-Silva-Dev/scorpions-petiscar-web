import { Category } from './category.model';

export interface CategoryParamBuild extends Category{
    page: number;
    size: number;
    productId: number;
    product: string;
    productIds: number[];
    categoryId: number;
    category: string;
    description: string;
    priceMin: number;
    priceMax: number;
}