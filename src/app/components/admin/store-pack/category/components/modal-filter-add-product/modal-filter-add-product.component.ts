import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-modal-filter-add-product',
	templateUrl: './modal-filter-add-product.component.html',
	styleUrls: ['./modal-filter-add-product.component.css']
})
export class ModalFilterAddProductComponent implements OnInit {

	public filterForm!: FormGroup;

	constructor(
    private _formBuilder: FormBuilder
	) { 
		//empty
	}

	ngOnInit(): void {
		this._createFilterForm();
	}



	/***************** METHODS PRIVATE *****************/

	private _createFilterForm(): void {
		this.filterForm = this._formBuilder.group({
      
		});
	}

}
