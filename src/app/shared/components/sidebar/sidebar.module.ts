import { PrimeNgModule } from './../../prime-ng/prime-ng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';


@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
