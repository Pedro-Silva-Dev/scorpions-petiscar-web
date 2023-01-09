import { ProductDetailView } from './product-detail-view.model';

export interface ProductDetailViewParamBuild extends ProductDetailView {
  page: number;
  size: number;
  priceMax: number;
  priceMin: number;
  categoryId: number;
}