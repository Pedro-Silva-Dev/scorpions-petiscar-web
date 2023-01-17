import { BehaviorSubject } from 'rxjs';
import { CategoryProductForm } from './../../models/category-product-form.model';
import { ToastrService } from 'ngx-toastr';
import { ProductSelected } from './../../../product/models/product-selected.model';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Product } from '../../../product/models/product.model';
import { ProductService } from '../../../product/services/product.service';
import { CategoryProductPromotion } from '../../models/category-product.model';
import { CategoryService } from '../../services/category.service';
import { CategoryParamBuild } from '../../models/category-param.build.model';
import { ProductDetailViewParamBuild } from '../../../product/models/product-detail-view-form.model';

@Component({
	selector: 'app-modal-add-product-category',
	templateUrl: './modal-add-product-category.component.html',
	styleUrls: ['./modal-add-product-category.component.css']
})
export class ModalAddProductCategoryComponent implements OnInit {

	@Output() finishEvent$ = new EventEmitter<boolean>();
	@Output() buildChange = new EventEmitter<Partial<ProductDetailViewParamBuild>>();

  @Input() categoryId: number;		
	@Input() products: CategoryProductPromotion[] = [];
	@Input() build: Partial<ProductDetailViewParamBuild>;

	public finishLoadEvent$ = new BehaviorSubject<boolean>(false);
	
	public productsSelected: ProductSelected[] = [];

	constructor(
		private _productService: ProductService,
		private _modalService: ModalService,
		private _categoryService: CategoryService,
		private _toastService: ToastrService,
		private _changeDetector: ChangeDetectorRef
	) { }

	ngOnInit(): void {
		this._setPaginator(this.build);
  	this._setProductsSelected();
	}

	public closeModal(): void {
  	this._modalService.close();
	}

	public save(): void {
  	const productsRemove = this._getProductsForRemove();
  	const productsAdd = this._getProductsForAdd();

  	if (productsRemove?.length && productsAdd?.length) {
  		this._removeAndAddProducts(productsRemove, productsAdd);
  	} else if (productsRemove?.length) {
  		this._removeProducts(productsRemove);
  	}else if (productsAdd?.length) { 
  		this._addProducts(productsAdd);
  	}
	}

	/******************** METHODS PRIVATE ********************/

	private _setProductsSelected(): void { 
  	this.productsSelected = this.products?.map(res => {
  		const selected: ProductSelected = { productId: res.id };
  		return selected;
  	});
	}

	private _getProductsForRemove(): CategoryProductPromotion[] {
  	const productsRemove: CategoryProductPromotion[] = [];
  	this.products?.forEach(product => { 
  		const productSelected = this.productsSelected?.find(res => res.productId == product.id);
  		if (!productSelected) {
  			productsRemove.push(product);
  		}
  	});
  	return productsRemove;
	}

	private _getProductsForAdd(): ProductSelected[] {
  	const productsAdd: ProductSelected[] = [];
  	this.productsSelected?.forEach(selected => {
  		const productAdded = this.products?.find(res => res.id == selected.productId);
  		if (!productAdded) { 
  			productsAdd.push(selected);
  		}
  	});
  	return productsAdd;
	}

	private _removeProducts(products: CategoryProductPromotion[], productsAdd?: ProductSelected[]): void {
  	const productIds = products?.map(res => res.id);
  	const build: Partial<CategoryParamBuild> = {productIds};
  	this._categoryService.removeProductsCategory(this.categoryId, build, this.finishLoadEvent$).subscribe(res => {
  		if (res.status == 200) {
  				this._toastService.success('Produtos removidos com sucesso!');
  			if (productsAdd?.length) {
  				this._addProducts(productsAdd);
  			} else {
  				this._finish();
  			}
  		}
  	});
	}

	private _addProducts(products: ProductSelected[]): void {
  	const productsIds = products?.map(res => res.productId);
  	const categoryProductForm: CategoryProductForm = { productsIds };
  	this._categoryService.addProductsCategory(this.categoryId, categoryProductForm, this.finishLoadEvent$).subscribe(res => {
  		if (res.status == 201) {
  			this._toastService.success('Produtos adicionados com sucesso!');
  			this._finish();
  		}
  	});
	}
	
	private _finish(): void {
  	this.finishEvent$.emit(true);
  	this.closeModal();
	}
	
	private _removeAndAddProducts(productsRemove: CategoryProductPromotion[], productsAdd: ProductSelected[]): void {
  	this._removeProducts(productsRemove, productsAdd);
	}

	private _setPaginator(build: Partial<ProductDetailViewParamBuild>): void {
  	if (!build) {
			this.build = { size: 10, page: 0 };
			// this._changeDetector.detectChanges();
		} else {
			this.build = { ...build };
		}
	}

}
