import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerButtonComponent } from './spinner-button/spinner-button.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';



@NgModule({
  declarations: [
    SpinnerButtonComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
  ],
  exports: [
    SpinnerButtonComponent,
    SpinnerComponent,
  ]
})
export class SpinnerModule { }
