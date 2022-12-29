import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Paginator } from 'src/app/shared/components/paginator/models/paginator.model';
import { MODAL_TYPE } from 'src/app/shared/enums/modal-type.model';
import { MODAL } from 'src/app/shared/enums/modal.enum';
import { Modal } from 'src/app/shared/models/modal.model';
import { Page } from 'src/app/shared/models/page.model';
import { ModalService } from 'src/app/shared/services/modal.service';
import { CategoryParamBuild } from '../../models/category-param.build.model';
import { CategoryProductPromotion } from '../../models/category-product.model';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
	templateUrl: './page-category-products.component.html',
	styleUrls: ['./page-category-products.component.css']
})
export class PageCategoryProductsComponent implements OnInit {

	private _page = 0;
	private _size = 10;

	public categoryProductsLoadEvent$ = new BehaviorSubject<boolean>(false);
	public removeCategoryProductsEvent$ = new BehaviorSubject<boolean>(false);
	public closeModalEvent$ = new BehaviorSubject<boolean>(false);
	public modalCategoryEvent$ = new BehaviorSubject<boolean>(false);

	public pagination: Page<CategoryProductPromotion> = null;
	public categoryProducts: CategoryProductPromotion[] = [];
	public categoryId!: number;
	public isDisplayModal = false;
	public isDisplayFilter = false;
	public filterForm!: FormGroup;

	constructor(
		private _categoryService: CategoryService,
		private _toastService: ToastrService,
		private _changeDetectorRef: ChangeDetectorRef,
		private _formBuilder: FormBuilder,
		private _activatedRoute: ActivatedRoute,
		private _modalService: ModalService
	) { }

	ngOnInit(): void {
		this._setInfoCategory();
		this._setCreateFilterForm();
		this._setCategoriesProductsPage();
	}

	public closeModal(): void {
		this._modalService.close();
	}

	public closeFilterModal(): void {
		setTimeout(() => {
			this.isDisplayFilter = false;
			this._changeDetectorRef.detectChanges();
		}, 0);
	}

	public changePage(page: Paginator): void {
		this._page = page.page;
		this._setCategoriesProductsPage();
	}

	public search(): void {
		this._page = 0;
		this._setCategoriesProductsPage();
		this.closeFilterModal();
	}

	public clearFilters(): void {
		this.filterForm.reset();
		this.search();
	}

	public refreshPage(): void {
		this._setCategoriesProductsPage();
	}

	public removeProductCategory(productId: number): void {
		const build: Partial<CategoryParamBuild> = { productIds: [productId]};
		this._categoryService.removeProductsCategory(this.categoryId, build, this.removeCategoryProductsEvent$).subscribe(res => {
			if (res.status == 200) {
				if (res.body?.success) {
					this._toastService.success('Produto removido com sucesso!');
					this._setCategoriesProductsPage();
				} else {
					this._toastService.warning('Não foi possível remover o produto, por favor tente novamente.');
				}
			}
		});
	}

	public displayModalAddProductsCategory(template: TemplateRef<any>, filterTemplate: TemplateRef<any>): void {
		const modal: Modal = {class: MODAL.MD, title: `Associar Produtos á ${this.categoryId}`, type: MODAL_TYPE.LARGE, template, filterTemplate};
		this._modalService.show(modal);
	}

	/********************* METHODS PRIVATE *********************/

	private _setCreateFilterForm(): void {
		this.filterForm = this._formBuilder.group({
			name: [null]
		});
	}

	private _setCategoriesProductsPage(): void {
		const form = this.filterForm.value;
		const build: Partial<CategoryParamBuild> = { page: this._page, size: this._size, name: form?.name };
		this._categoryService.getPageCategoryProductsPromotion(this.categoryId, build, this.categoryProductsLoadEvent$).subscribe(res => {
			if (res.status == 200) {
				this.pagination = res.body;
				this.categoryProducts = this.pagination?.content;
			}
		});
	}

	private _setInfoCategory(): void { 
		this.categoryId = this._activatedRoute.snapshot.params['categoryId'];
	}
	

}
