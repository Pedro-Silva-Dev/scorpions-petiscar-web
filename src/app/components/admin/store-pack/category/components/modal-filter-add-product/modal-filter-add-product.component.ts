import { FormBuilder } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Status } from 'src/app/shared/models/status.model';
import { StatusService } from 'src/app/shared/services/status.service';
import { ProductDetailViewParamBuild } from '../../../product/models/product-detail-view-form.model';

@Component({
	selector: 'app-modal-filter-add-product',
	templateUrl: './modal-filter-add-product.component.html',
	styleUrls: ['./modal-filter-add-product.component.css']
})
export class ModalFilterAddProductComponent implements OnInit {

	@Output() searchFilterEvent$ = new EventEmitter<Partial<ProductDetailViewParamBuild>>();

	public filterForm!: FormGroup;
	public status: Status[] = [];

	constructor(
		private _formBuilder: FormBuilder,
		private _statusService: StatusService
	) { 
		//empty
	}

	ngOnInit(): void {
		this._createFilterForm();
		this._setStatus();
	}

	public search(): void {
		this.searchFilterEvent$.emit(this.filterForm.value);
	}

	public clearFilters(): void {
		this.filterForm.reset();
		this.search();
	}


	/***************** METHODS PRIVATE *****************/

	private _createFilterForm(): void {
		this.filterForm = this._formBuilder.group({
			product: [null],
			priceMin: [null],
			priceMax: [null],
			productActive: [null],
			productDescription: [null],
		});
	}

	private _setStatus(): void {
		this.status = this._statusService.getListStatus();
	}

}
