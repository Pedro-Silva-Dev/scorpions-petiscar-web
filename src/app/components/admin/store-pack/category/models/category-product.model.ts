export interface CategoryProductPromotion {
    id: number; //Id do produto.
    product: string;
    productDescription: string;
    productUrlPhoto: string;
    price: number;
    productActive: boolean;
    discount: number;
    discountPercentage: boolean;
    promotionId: number;
    promotion: string;
    promotionDescription: string;
    promotionUrlPhoto: string;
    promotionActive: boolean;
    promotionDhi: string;
    promotionDhf: string;
    categoryIds: string[];
    categories: string[];
    companyId: number;
}