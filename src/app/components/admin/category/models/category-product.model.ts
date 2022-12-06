export interface CategoryProduct {
    id: number;
    productId: number;
    product: string;
    description: string;
    urlPhoto: string;
    productActive: boolean;
    price: number;
    categoryId: number;
    category: string;
    categoryActive: boolean;
    companyId: number;
}