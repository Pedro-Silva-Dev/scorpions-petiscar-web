import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PrimeNgModule } from "./prime-ng/prime-ng.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SpinnerModule } from "./components/spinner/spinner.module";
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
	declarations: [

	
    ModalComponent
  ],
	imports: [
		CommonModule,
		PrimeNgModule,
		ReactiveFormsModule,
		SpinnerModule,
		FormsModule,
	],
	exports: [
		PrimeNgModule,
		ReactiveFormsModule,
		SpinnerModule,
		FormsModule,
  ModalComponent,
	]
})
export class SharedModule { }
