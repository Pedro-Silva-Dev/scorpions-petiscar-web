import { ProductModule } from './../product/product.module';
import { SharedModule } from '../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { ModalCreateCategoryComponent } from './components/modal-create-category/modal-create-category.component';
import { PageCategoryProductsComponent } from './components/page-category-products/page-category-products.component';
import { ModalAddProductCategoryComponent } from './components/modal-add-product-category/modal-add-product-category.component';
import { ModalFilterAddProductComponent } from './components/modal-filter-add-product/modal-filter-add-product.component';


@NgModule({
	declarations: [
		CategoryComponent,
  		ModalCreateCategoryComponent,
    	PageCategoryProductsComponent,
		ModalAddProductCategoryComponent,
		ModalFilterAddProductComponent
	],
	imports: [
		CommonModule,
		CategoryRoutingModule,
		SharedModule,
		ProductModule
	],
	exports: [
   		ModalCreateCategoryComponent,
		ModalAddProductCategoryComponent,
		ModalFilterAddProductComponent
	]
})
export class CategoryModule { }
