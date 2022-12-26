import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PrimeNgModule } from "./prime-ng/prime-ng.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SpinnerModule } from "./components/spinner/spinner.module";
import { PaginatorComponent } from './components/paginator/paginator.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { ModalsModule } from './components/modals/modals.module';




@NgModule({
	declarations: [
        PaginatorComponent,
		FilterBarComponent
	],
	imports: [
		CommonModule,
		PrimeNgModule,
		ReactiveFormsModule,
		SpinnerModule,
		FormsModule,
		SweetAlert2Module.forRoot(),
	],
	exports: [
		PrimeNgModule,
		ReactiveFormsModule,
		SpinnerModule,
		FormsModule,
		PaginatorComponent,
		FilterBarComponent,
		SweetAlert2Module,
	]
})
export class SharedModule { }
