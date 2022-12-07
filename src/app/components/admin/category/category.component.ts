import { BehaviorSubject } from "rxjs";
import { CategoryParamBuild } from "./models/category-param.build.model";
import { Component, OnInit } from "@angular/core";
import { Category } from "./models/category.model";
import { CategoryService } from "./services/category.service";
import { Page } from "src/app/shared/models/page.model";

@Component({
	selector: "app-category",
	templateUrl: "./category.component.html",
	styleUrls: ["./category.component.css"]
})
export class CategoryComponent implements OnInit {

	private _page = 0;
	private _size = 10;

	public categoryLoadEvent$ = new BehaviorSubject<boolean>(false);

	public page: Page<Category> = null;
	public categories: Category[] = [];

	constructor(
    private _categoryService: CategoryService
	) { }

	ngOnInit(): void {
		this._setCategoriesPage();
	}


	/********************* METHODS PRIVATE *********************/

	private _setCategoriesPage(): void {
		const build: Partial<CategoryParamBuild> = {page: this._page, size: this._size};
		this._categoryService.getPageCategory(build, this.categoryLoadEvent$).subscribe(
			res => {
				if(res.status == 200) {
					this.page = res.body;
					this.categories = this.page?.content;
				}
			});
	}

}
