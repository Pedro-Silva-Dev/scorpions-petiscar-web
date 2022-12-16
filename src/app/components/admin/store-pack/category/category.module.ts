import { SharedModule } from "../../../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CategoryRoutingModule } from "./category-routing.module";
import { CategoryComponent } from "./category.component";
import { ModalCreateCategoryComponent } from './components/modal-create-category/modal-create-category.component';


@NgModule({
	declarations: [
		CategoryComponent,
  		ModalCreateCategoryComponent
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
