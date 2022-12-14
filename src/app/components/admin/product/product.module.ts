import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ModalCreateProductComponent } from './components/modal-create-product/modal-create-product.component';


@NgModule({
  declarations: [
    ProductComponent,
    ModalCreateProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ],
  exports: [
    ModalCreateProductComponent
  ]
})
export class ProductModule { }
