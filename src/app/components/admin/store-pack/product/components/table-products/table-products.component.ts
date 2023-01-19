import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Paginator } from 'src/app/shared/components/paginator/models/paginator.model';
import { Page } from 'src/app/shared/models/page.model';
import { ProductDetailViewParamBuild } from '../../models/product-detail-view-form.model';
import { ProductDetailView } from '../../models/product-detail-view.model';
import { ProductParamBuild } from '../../models/product-param.build.model';
import { ProductSelected } from '../../models/product-selected.model';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
	selector: 'app-table-products',
	templateUrl: './table-products.component.html',
	styleUrls: ['./table-products.component.css']
})
export class TableProductsComponent implements OnInit {

	@Output() productsSelectedChange = new EventEmitter<ProductSelected[]>();
	@Output() buildChange = new EventEmitter<Partial<ProductDetailViewParamBuild>>();
  @Output() updateStatusEvent$ = new EventEmitter<ProductDetailView>();
  @Output() editProductEvent$ = new EventEmitter<ProductDetailView>();

  @Input() productsSelected: ProductSelected[] = [];
  @Input() build: Partial<ProductDetailViewParamBuild>;
  @Input() isUpdateStatus = false;
  @Input() isEditProduct = false;
  @Input() isSelectProduct = false;
	@Input() blocked = true;


	private _page = 0;
	private _size = 10;

	public loadProductEvent$ = new BehaviorSubject<boolean>(false);

	public pagination!: Page<ProductDetailView>;
	public products!: ProductDetailView[];
	public isSelectedAll = false;

	constructor(
    private _productService: ProductService,
	) { }

	ngOnInit(): void {
  	this._setPaginator();
  	this._setPageProduct();
	}


	public updateProductInPage(product: Product): void { 
  	if (product) {
  		this._setPageProduct();
  	}
	}

	public changePage(page: Paginator): void {
  	this._page = page.page;
  	this.build = { ...this.build, page: this._page };
  	this.buildChange.emit(this.build);
  	this._setPageProduct();
	}

	public editProduct(product: ProductDetailView): void {
  	this.editProductEvent$.emit(product);
	}

	public updateStatusProduct(product: ProductDetailView): void {
  	product.productActive = !product.productActive;
  	this.updateStatusEvent$.emit(product);
	}

	public isDisplayActions(): boolean {
  	return this.isUpdateStatus || this.isEditProduct ? true : false;
	}

	public selectedProduct(product: ProductDetailView): void {
  	if (this._isProductSelected(product)) {
  		this._removeProductSelected(product);
  	} else {
  		this._addProductSelected(product);
  	}
  	this.isSelectedAll = this.isSelectedAllProducts(this.products);
	}

	public selectedListProducts(products: ProductDetailView[]): void {
  	if (this.isSelectedAllProducts(products)) {
  		products?.forEach(res => {
  			this._removeProductSelected(res);
  		});
  	} else {
  		products?.forEach(res => {
  			if (!this._isProductSelected(res)) {
  				this._addProductSelected(res);  
  			}
  		});
  	}
	}

	public isSelectedAllProducts(products: ProductDetailView[]): boolean { 
  	let selectedAll = true;
  	products?.forEach(res => {
  		if (!this._isProductSelected(res)) {
  			selectedAll = false;
  		}
  	});
  	return selectedAll;
	}

	/******************** METHODS PRIVATE ********************/

	private _setPageProduct(): void {
  	this._productService.getPageProduct(this.build, this.loadProductEvent$).subscribe(res => {
  		if(res.status == 200) {
  			this.pagination = res.body;
  			this.products = res.body.content;
  			this.products?.forEach(product => {
  				product.selected = this._isProductSelected(product);
  			});
  			this.isSelectedAll = this.isSelectedAllProducts(this.products);
  		}
  	});
	}

	private _getCategoryNames(categories: string[]): string {
  	let catgoryNames = '';
  	if(categories?.length) {
  		categories.forEach(category => {
  			catgoryNames = `${catgoryNames}, ${category.toLowerCase()}`;
  		});
  		catgoryNames = catgoryNames.startsWith(',') ? catgoryNames.replace(',', '') : catgoryNames;
  	}
  	return catgoryNames;
	}

	private _isProductSelected(product: ProductDetailView): boolean { 
  	const selected = this.productsSelected?.find(res => res.productId === product?.id);
  	return selected ? true : false;
	}

	private _removeProductSelected(product: ProductDetailView): void {
  	product.selected = false;
  	this.productsSelected = this.productsSelected?.filter(res => res.productId != product.id);
  	this.productsSelectedChange.emit(this.productsSelected);
	}

	private _addProductSelected(product: ProductDetailView): void {
  	product.selected = true;
  	const selected: ProductSelected = { productId: product.id };
  	this.productsSelected.push(selected);
  	this.productsSelectedChange.emit(this.productsSelected);
	}

	private _setPaginator(): void {
  		this.build = {...this.build, size: 10};
	}

}
