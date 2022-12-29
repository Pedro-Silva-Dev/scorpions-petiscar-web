import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Paginator } from 'src/app/shared/components/paginator/models/paginator.model';
import { Page } from 'src/app/shared/models/page.model';
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
  @Output() updateStatusEvent$ = new EventEmitter<Product>();
  @Output() editProductEvent$ = new EventEmitter<Product>();

  @Input() productsSelected: ProductSelected[] = [];
  @Input() build: Partial<ProductParamBuild>;
  @Input() isUpdateStatus = false;
  @Input() isEditProduct = false;
  @Input() isSelectProduct = false;

  private _page: number;
  private _size: number;

  public loadProductEvent$ = new BehaviorSubject<boolean>(false);

  public pagination!: Page<Product>;
  public products!: Product[];
  public isSelectedAll = false;

  constructor(
    private _productService: ProductService,
  ) { }

  ngOnInit(): void {
  	this._setPageProduct();
  }


  public updateProductInPage(product: Product): void { 
  	if (product) {
  		this._setPageProduct();
  	}
  }

  public changePage(page: Paginator): void {
  	this._page = page.page;
  	this._setPageProduct();
  }

  public editProduct(product: Product): void {
  	this.editProductEvent$.emit(product);
  }

  public updateStatusProduct(product: Product): void {
  	product.active = !product.active;
  	this.updateStatusEvent$.emit(product);
  }

  public isDisplayActions(): boolean {
  	return this.isUpdateStatus || this.isEditProduct ? true : false;
  }

  public selectedProduct(product: Product): void {
  	if (this._isProductSelected(product)) {
  		this._removeProductSelected(product);
  	} else {
  		this._addProductSelected(product);
  	}
  	this.isSelectedAll = this.isSelectedAllProducts(this.products);
  }

  public selectedListProducts(products: Product[]): void {
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

  public isSelectedAllProducts(products: Product[]): boolean { 
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
  				product.categories = this._getCategoryNames(product.categories);
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

  private _isProductSelected(product: Product): boolean { 
  	const selected = this.productsSelected?.find(res => res.productId === product?.id);
  	return selected ? true : false;
  }

  private _removeProductSelected(product: Product): void {
  	product.selected = false;
  	this.productsSelected = this.productsSelected?.filter(res => res.productId != product.id);
  	this.productsSelectedChange.emit(this.productsSelected);
  }

  private _addProductSelected(product: Product): void {
  	product.selected = true;
  	const selected: ProductSelected = { productId: product.id };
  	this.productsSelected.push(selected);
  	this.productsSelectedChange.emit(this.productsSelected);
  }



}
