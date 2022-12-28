import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ModalCreateProductComponent } from './components/modal-create-product/modal-create-product.component';
import { TableProductsComponent } from './components/table-products/table-products.component';


@NgModule({
  declarations: [
    ProductComponent,
    ModalCreateProductComponent,
    TableProductsComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ],
  exports: [
    ModalCreateProductComponent,
    TableProductsComponent
  ]
})
export class ProductModule { }
