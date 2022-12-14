import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ProductParamBuild, ProductParamBuildForm } from './models/product-param.build.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from './services/product.service';
import { Product } from './models/product.model';
import { Page } from 'src/app/shared/models/page.model';
import { Paginator } from 'src/app/shared/components/paginator/models/paginator.model';
import { Category } from '../category/models/category.model';
import { CategoryService } from '../category/services/category.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private _page: number;
  private _size: number;

  public loadProductEvent$ = new BehaviorSubject<boolean>(false);
  public updateProductEvent$ = new BehaviorSubject<boolean>(false);
  public modalProductEvent$ = new BehaviorSubject<boolean>(false);

  public filterForm!: FormGroup;
  public products!: Product[];
  public product!: Product;
  public pagination!: Page<Product>
  public categories: Category[];
  public isDisplayModal = false;
	public isDisplayFilter = false;

  constructor(
    private _productService: ProductService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _toastService: ToastrService,
    private _categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this._createFilterForm();
    this._setPageProduct();
    this._setCategoriesList();
  }

  public displayModalCategory(product?: Product): void {
		this.modalProductEvent$.next(false);
		this._changeDetectorRef.detectChanges();
		if (product) {
			this.product = {...product};
		} else {
			this.product = null;
		}
		this.isDisplayModal = true;
		this.modalProductEvent$.next(true);
	}

	public updateStatusCategory(product: Product): void {
		product.active = !product.active;
		this._updateProduct(product?.id, product);
	}

  public changePage(page: Paginator): void {
		this._page = page.page;
		this._setPageProduct();
	}

	public search(): void {
		this._page = 0;
		this._setPageProduct();
		this.closeFilterModal();
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
			this._updateProductInPage(product);
		}
	}

  /******************** METHODS PRIVATE ********************/

  private _createFilterForm(): void {
    this.filterForm = new FormGroup<Partial<ProductParamBuildForm>>({
      name: new FormControl(null),
      description: new FormControl(null),
      priceMax: new FormControl(null),
      priceMin: new FormControl(null),
    });
  }

  private _setPageProduct(): void {
    const form = this.filterForm.value;
    const build: Partial<ProductParamBuild> = {page: this._page, size: this._size, name: form?.name, description: form?.description, priceMax: form?.priceMax, priceMin: form?.priceMin}
    
    this._productService.getPageProduct(build, this.loadProductEvent$).subscribe(res => {
      if(res.status == 200) {
        this.pagination = res.body;
        this.products = res.body.content;
      }
    });
  }

  private _updateProduct(id: number, product: Product): void { 
		this._productService.updateProduct(id, product, this.updateProductEvent$).subscribe(res => {
			if (res.status == 202) {
				this._toastService.success(`Produto atualizado com sucesso!`);
				this._updateProductInPage(product);
			}
		});
	}

	private _updateProductInPage(product: Product): void {
		let isNewProduct = true;
		this.products?.forEach((res, index) => {
			if (res.id == product?.id) {
				this.products[index] = { ...product };
				isNewProduct = false;
			}
		});
		if(isNewProduct) {
			this.products.push(product);
		}
		this._changeDetectorRef.detectChanges();
	}

  private _setCategoriesList(): void {
		this._categoryService.getListCategory(null).subscribe(res => {
			if (res.status == 200) {
				this.categories = res.body;
			}
		});
	}

}
