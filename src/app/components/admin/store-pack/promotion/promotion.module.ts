import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionRoutingModule } from './promotion-routing.module';
import { PromotionComponent } from './promotion.component';
import { ModalCreatePromotionComponent } from './components/modal-create-promotion/modal-create-promotion.component';


@NgModule({
  declarations: [
    PromotionComponent,
    ModalCreatePromotionComponent
  ],
  imports: [
    CommonModule,
    PromotionRoutingModule,
    SharedModule
  ],
  exports: [
    ModalCreatePromotionComponent
  ]
})
export class PromotionModule { }
