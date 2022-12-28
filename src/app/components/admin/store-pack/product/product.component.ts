import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ProductParamBuild, ProductParamBuildForm } from './models/product-param.build.model';
import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from './services/product.service';
import { Product } from './models/product.model';
import { Category } from '../category/models/category.model';
import { CategoryService } from '../category/services/category.service';
import { Status } from 'src/app/shared/models/status.model';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Modal } from 'src/app/shared/models/modal.model';
import { MODAL_TYPE } from 'src/app/shared/enums/modal-type.model';
import { MODAL } from 'src/app/shared/enums/modal.enum';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

	public loadProductEvent$ = new BehaviorSubject<boolean>(false);
	public updateProductEvent$ = new BehaviorSubject<boolean>(false);
	public modalProductEvent$ = new BehaviorSubject<boolean>(false);

	public filterForm!: FormGroup;
	public product!: Product;
	public categories: Category[];
	public status: Status[] = [];
	public isDisplayModal = false;
	public isDisplayFilter = false;
	public build: Partial<ProductParamBuild>;

	constructor(
		private _productService: ProductService,
		private _changeDetectorRef: ChangeDetectorRef,
		private _toastService: ToastrService,
		private _categoryService: CategoryService,
		private _modalService: ModalService
	) { }

	ngOnInit(): void {
		this._setStatus();
		this._createFilterForm();
		this._setCategoriesList();
	}

	public displayModalCategory(template: TemplateRef<any>, product?: Product): void {
		if (product) {
			this.product = {...product};
		} else {
			this.product = null;
		}
		const modal: Modal = {template, title: this.product ? 'Atualizar Produto' : 'Cadastrar Produto', type: MODAL_TYPE.DEFAULT, class: MODAL.MD};
		this._modalService.show(modal);
	}

	public updateStatusCategory(product: Product): void {
		const updateProduct = {...product, active: !product.active};
		this._updateProduct(product?.id, updateProduct);
	}
	

	public clearFilters(): void {
		this.filterForm.reset();
		this.search();
	}

	public closeModal(): void {
		setTimeout(() => {
			this.isDisplayModal = false;
			this._changeDetectorRef.detectChanges();
		}, 0);
	}

	public closeFilterModal(): void {
		setTimeout(() => {
			this.isDisplayFilter = false;
			this._changeDetectorRef.detectChanges();
		}, 0);
	}

	public updateProductInPage(product: Product): void { 
		if (product) {
			this._refreshPage();
		}
	}

	public search(): void {
		const form = this.filterForm.value;
		this.build = { name: form?.name, description: form?.description, priceMax: form?.priceMax, priceMin: form?.priceMin, categoryId: form?.categoryId, active: form?.status };
		this._refreshPage();
		this.closeFilterModal();
	}
	
	/******************** METHODS PRIVATE ********************/

	private _createFilterForm(): void {
		this.filterForm = new FormGroup<Partial<ProductParamBuildForm>>({
			name: new FormControl(null),
			description: new FormControl(null),
			priceMax: new FormControl(null),
			priceMin: new FormControl(null),
			categoryId: new FormControl(null),
			status: new FormControl(null),
		});
	}

 

	private _updateProduct(id: number, product: Product): void { 
		this._productService.updateProduct(id, product, null, this.updateProductEvent$).subscribe(res => {
			if (res.status == 202) {
				this._toastService.success('Produto atualizado com sucesso!');
				this.updateProductInPage(res.body);
			}
		});
	}

	private _setCategoriesList(): void {
		this._categoryService.getListCategory(null).subscribe(res => {
			if (res.status == 200) {
				this.categories = res.body;
			}
		});
	}

	private _setStatus(): void {
		const active: Status =  {id: 1, name: 'Habilitado', status: true};
		const disable: Status =  {id: 2, name: 'Desabilitado', status: false};
		this.status = [active, disable];
	}

	private _refreshPage(): void {
		this.loadProductEvent$.next(true);
		setTimeout(() => {
			this.loadProductEvent$.next(false);
		}, 0);
	}

}
