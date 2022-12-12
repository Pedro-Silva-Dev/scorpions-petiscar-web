import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PrimeNgModule } from "./prime-ng/prime-ng.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SpinnerModule } from "./components/spinner/spinner.module";
import { ModalComponent } from './components/modal/modal.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';



@NgModule({
	declarations: [

	
    ModalComponent,
       PaginatorComponent,
       FilterBarComponent
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
  PaginatorComponent,
  FilterBarComponent,
	]
})
export class SharedModule { }
