import { SharedModule } from "../../../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CategoryRoutingModule } from "./category-routing.module";
import { CategoryComponent } from "./category.component";
import { ModalCreateCategoryComponent } from './components/modal-create-category/modal-create-category.component';
import { PageCategoryProductsComponent } from './components/page-category-products/page-category-products.component';


@NgModule({
	declarations: [
		CategoryComponent,
  		ModalCreateCategoryComponent,
    	PageCategoryProductsComponent
	],
	imports: [
		CommonModule,
		CategoryRoutingModule,
		SharedModule
	],
	exports: [
   		ModalCreateCategoryComponent
	]
})
export class CategoryModule { }
