import { ModalLargeComponent } from '../../modal-large/modal-large.component';
import { ModalComponent } from './modal/modal.component';
import { PrimeNgModule } from './../../prime-ng/prime-ng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalsComponent } from './modals.component';


@NgModule({
  declarations: [
    ModalsComponent,
    ModalComponent,
    ModalLargeComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    ModalsComponent,
    ModalComponent,
    ModalLargeComponent,
  ]
})
export class ModalsModule { }
