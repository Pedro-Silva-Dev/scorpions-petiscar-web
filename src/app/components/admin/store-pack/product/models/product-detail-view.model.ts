export interface ProductDetailView {
  id: number;
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
  categoryIds: number[];
  categories: string[];
  selected?: boolean;
  companyId: number;
}