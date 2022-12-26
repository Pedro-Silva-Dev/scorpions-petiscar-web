import { ProductParamBuild } from '../../models/product-param.build.model';
import { Category } from '../../../category/models/category.model';
import { FormControl } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product, ProductForm } from '../../models/product.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MODAL } from 'src/app/shared/enums/modal.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-modal-create-product',
  templateUrl: './modal-create-product.component.html',
  styleUrls: ['./modal-create-product.component.css']
})
export class ModalCreateProductComponent implements OnInit {

	@Output() finishEvent$ = new EventEmitter();
	@Output() displayChange = new EventEmitter<boolean>();

	@Input() product!: Product;
  	@Input() categories: Category[];
	@Input() display = false;

	public createProductEvent$ = new BehaviorSubject<boolean>(false);
	
	public modal = MODAL;
	public title = "";
	public labelButtonFinish = "";
	public productForm!: FormGroup;

	constructor(
		private _formBuilder: FormBuilder,
		private _productService: ProductService,
		private _toastrService: ToastrService,
		private _modalService: ModalService
	) { }
	
	ngOnInit(): void {
		this._setInfoForm();
		this._createProductForm();
	}

	public isFieldValid(field: string): boolean { 
		const valid = this.productForm.get(field)?.dirty && this.productForm.get(field)?.invalid ? false : true;
		return valid;
	}

	public isProductFormValid(): boolean { 
		return this.productForm?.valid;
	}

	public save(): void {
		if (this.isProductFormValid()) {
			if (this.product?.id) {
				this._updateProduct(this.product.id, this.productForm.value);
			} else {
				this._createProduct(this.productForm.value);
			}
		}
	}

	public closeModal(): void {		
		this._modalService.close();
	}

	/***************** METHODS PRIVATE *****************/

	private _createProductForm(): void {
		this.productForm = new FormGroup<Partial<ProductForm>>({
			id: new FormControl(this.product?.id ? this.product.id : null),
			name: new FormControl(this.product?.name ? this.product.name : null, [Validators.required]),
			price: new FormControl(this.product?.price ? this.product.price : null, [Validators.required]),
			description: new FormControl(this.product?.description ? this.product.description : null),
			urlPhoto: new FormControl(this.product?.urlPhoto ? this.product.urlPhoto : null),
			categoryIds: new FormControl(this.product?.categoryIds ? this.getCategoryIds(this.product.categoryIds) : null, [Validators.required]),
			active: new FormControl((this.product?.active == null || this.product?.active == undefined) ? true : this.product.active)
		});
	}

	private _setInfoForm(): void {
		this.title = this.product?.id ? `Atualizar Produto` : `Cadastrar Produto`;
		this.labelButtonFinish = this.product?.id ? `Atualizar` : `Cadastrar`;
	}

	private _createProduct(product: Product): void {
		const build: Partial<ProductParamBuild> = {categoryIds: this.productForm?.get('categoryIds')?.value}
		this._productService.createProduct(product, build, this.createProductEvent$).subscribe(res => {
			if (res.status == 201) {
				this._toastrService.success(`Produto cadastrada com sucesso!`);
				this.finishEvent$.emit(res.body);
				this.closeModal();
			}
		});
	}

	private _updateProduct(id: number, product: Product): void { 
		const build: Partial<ProductParamBuild> = {categoryIds: this.productForm?.get('categoryIds')?.value}
		this._productService.updateProduct(id, product, build, this.createProductEvent$).subscribe(res => {
			if (res.status == 202) {
				this._toastrService.success(`Produto atualizada com sucesso!`);
				this.finishEvent$.emit(res.body);
				this.closeModal();
			}
		});
	}

	private getCategoryIds(categoryIds: number[]): number[] {
		const ids = categoryIds?.map(res => Number.parseInt(res.toString()));
		return ids?.length ? ids : [];
	}

}
