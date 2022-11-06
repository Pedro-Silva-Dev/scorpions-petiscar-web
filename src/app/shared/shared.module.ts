import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerButtonComponent } from './components/spinner-button/spinner-button.component';



@NgModule({
  declarations: [

  
    SpinnerButtonComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule
  ],
  exports: [
    PrimeNgModule,
    ReactiveFormsModule,
    SpinnerButtonComponent
  ]
})
export class SharedModule { }
