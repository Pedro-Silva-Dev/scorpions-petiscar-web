import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from './components/spinner/spinner.module';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    SpinnerModule,
  ],
  exports: [
    PrimeNgModule,
    ReactiveFormsModule,
    SpinnerModule,
  ]
})
export class SharedModule { }
