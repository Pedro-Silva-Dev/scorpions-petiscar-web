import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './index/index.component';
import { PromotionsComponent } from './index/promotions/promotions.component';


@NgModule({
  declarations: [
    IndexComponent,
    PromotionsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  exports: [
    PromotionsComponent
  ]
})
export class HomeModule { }
