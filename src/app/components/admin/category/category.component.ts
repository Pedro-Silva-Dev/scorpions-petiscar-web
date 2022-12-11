import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from "rxjs";
import { CategoryParamBuild } from "./models/category-param.build.model";
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Category } from "./models/category.model";
import { CategoryService } from "./services/category.service";
import { Page } from "src/app/shared/models/page.model";

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

	public page: Page<Category> = null;
	public categories: Category[] = [];
	public category!: Category;
	public isDisplayModal = false;

	constructor(
		private _categoryService: CategoryService,
		private _toastService: ToastrService,
		private _changeDetectorRef: ChangeDetectorRef
	) { }

	ngOnInit(): void {
		this._setCategoriesPage();
	}

	public displayModalCategory(category?: Category): void {
		this.modalCategoryEvent$.next(false);
		this._changeDetectorRef.detectChanges();
		if (category) {
			this.category = {...category};
		} else {
			this.category = null;
		}
		this.isDisplayModal = true;
		this.modalCategoryEvent$.next(true);
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

	public updateCategoryInPage(category: Category): void { 
		if (category) {
			this._updateCategoryInPage(category);
		}
	}

	/********************* METHODS PRIVATE *********************/

	private _setCategoriesPage(): void {
		const build: Partial<CategoryParamBuild> = { page: this._page, size: this._size };
		this._categoryService.getPageCategory(build, this.categoryLoadEvent$).subscribe(res => {
			if (res.status == 200) {
				this.page = res.body;
				this.categories = this.page?.content;
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
