import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Paginator } from 'src/app/shared/components/paginator/models/paginator.model';
import { Page } from 'src/app/shared/models/page.model';
import { ProductParamBuild } from '../../models/product-param.build.model';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
	selector: 'app-table-products',
	templateUrl: './table-products.component.html',
	styleUrls: ['./table-products.component.css']
})
export class TableProductsComponent implements OnInit {

  @Output() updateStatusEvent$ = new EventEmitter<Product>();
  @Output() editProductEvent$ = new EventEmitter<Product>();

  @Input() build: Partial<ProductParamBuild>;
  @Input() isUpdateStatus = false;
  @Input() isEditProduct = false;

  private _page: number;
  private _size: number;

  public loadProductEvent$ = new BehaviorSubject<boolean>(false);

  public pagination!: Page<Product>;
  public products!: Product[];

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

  public search(): void {
  	this._page = 0;
  	this._setPageProduct();
  	// this.closeFilterModal();
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

  /******************** METHODS PRIVATE ********************/

  private _setPageProduct(): void {
  	this._productService.getPageProduct(this.build, this.loadProductEvent$).subscribe(res => {
  		if(res.status == 200) {
  			this.pagination = res.body;
  			this.products = res.body.content;
  			this.products?.forEach(product => {
  				product.categories = this._getCategoryNames(product.categories);
  			});
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

}
