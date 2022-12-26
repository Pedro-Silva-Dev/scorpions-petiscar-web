import { MODAL } from 'src/app/shared/enums/modal.enum';
import { Paginator } from '../../../../shared/components/paginator/models/paginator.model';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from "rxjs";
import { CategoryParamBuild } from "./models/category-param.build.model";
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, TemplateRef } from "@angular/core";
import { Category } from "./models/category.model";
import { CategoryService } from "./services/category.service";
import { Page } from "src/app/shared/models/page.model";
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Modal } from 'src/app/shared/models/modal.model';
import { MODAL_TYPE } from 'src/app/shared/enums/modal-type.model';

@Component({
	selector: "app-category",
	templateUrl: "./category.component.html",
	styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {

	private _page = 0;
	private _size = 10;

	public categoryLoadEvent$ = new BehaviorSubject<boolean>(false);
	public categoryUpdateEvent$ = new BehaviorSubject<boolean>(false);
	public closeModalEvent$ = new BehaviorSubject<boolean>(false);
	public modalCategoryEvent$ = new BehaviorSubject<boolean>(false);

	public pagination: Page<Category> = null;
	public categories: Category[] = [];
	public category!: Category;
	public isDisplayModal = false;
	public isDisplayFilter = false;
	public filterForm!: FormGroup;

	constructor(
		private _categoryService: CategoryService,
		private _toastService: ToastrService,
		private _changeDetectorRef: ChangeDetectorRef,
		private _formBuilder: FormBuilder,
		private _modalService: ModalService
	) { }

	ngOnInit(): void {
		this._setCreateFilterForm();
		this._setCategoriesPage();
	}

	public displayModalCategory(template: TemplateRef<any>, category?: Category): void {
		if (category) {
			this.category = {...category};
		} else {
			this.category = null;
		}
		const modal: Modal = {template, title: this.category ? `Atualizar Categoria` : `Cadastrar Categoria`, type: MODAL_TYPE.DEFAULT, class: MODAL.MD}
		this._modalService.show(modal);
	}

	public updateStatusCategory(category: Category): void {
		category.active = !category.active;
		this._updateCategory(category?.id, category);
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

	public updateCategoryInPage(category: Category): void { 
		if (category) {
			this._updateCategoryInPage(category);
		}
	}

	public changePage(page: Paginator): void {
		this._page = page.page;
		this._setCategoriesPage();
	}

	public search(): void {
		this._page = 0;
		this._setCategoriesPage();
		this.closeFilterModal();
	}

	public clearFilters(): void {
		this.filterForm.reset();
		this.search();
	}

	/********************* METHODS PRIVATE *********************/

	private _setCreateFilterForm(): void {
		this.filterForm = this._formBuilder.group({
			name: [null]
		});
	}

	private _setCategoriesPage(): void {
		const form = this.filterForm.value;
		const build: Partial<CategoryParamBuild> = { page: this._page, size: this._size, name: form?.name };
		this._categoryService.getPageCategory(build, this.categoryLoadEvent$).subscribe(res => {
			if (res.status == 200) {
				this.pagination = res.body;
				this.categories = this.pagination?.content;
			}
		});
	}

	private _updateCategory(id: number, category: Category): void { 
		this._categoryService.updateCategory(id, category, this.categoryUpdateEvent$).subscribe(res => {
			if (res.status == 202) {
				this._toastService.success(`Categoria atualizada com sucesso!`);
				this._updateCategoryInPage(category);
			}
		});
	}

	private _updateCategoryInPage(category: Category): void {
		let isNewCategory = true;
		this.categories?.forEach((res, index) => {
			if (res.id == category?.id) {
				this.categories[index] = { ...category };
				isNewCategory = false;
			}
		});
		if(isNewCategory) {
			this.categories.push(category);
		}
		this._changeDetectorRef.detectChanges();
	}

}
