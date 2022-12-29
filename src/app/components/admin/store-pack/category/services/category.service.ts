import { ToastrService } from 'ngx-toastr';
import { CategoryProductPromotion } from '../models/category-product.model';
import { Category } from '../models/category.model';
import { Page } from '../../../../../shared/models/page.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';
import { CategoryParamBuild } from '../models/category-param.build.model';
import { StatusRequest } from 'src/app/shared/models/status-request.model';
import { CategoryProductForm } from '../models/category-product-form.model';

@Injectable({
	providedIn: 'root'
})
export class CategoryService extends BaseService {

	constructor(
    private _http: HttpClient,
    private _toastrService: ToastrService,
	) { 
		super(_http, _toastrService);
	}

	public getPageCategory(build: Partial<CategoryParamBuild>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<Page<Category>>> {
		const url = '/category/admin/index.json';
		const msgError = 'Não foi possível obter a página de categorias, por favor contate o suporte.';
		return this.get(url, loadEvent, msgError, build);
	}

	public getListCategory(build: Partial<CategoryParamBuild>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<Category[]>> {
		const url = '/category/admin/list.json';
		const msgError = 'Não foi possível obter a lista de categorias, por favor contate o suporte.';
		return this.get(url, loadEvent, msgError, build);
	}

	public getCategory(id: number, build: Partial<CategoryParamBuild>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<Category>> {
		const url = `/category/admin/${id}.json`;
		const msgError = 'Não foi possível obter a categoria, por favor contate o suporte.';
		return this.get(url, loadEvent, msgError, build);
	}

	public createCategory(category: Partial<Category>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<Category>> {
		const url = '/category/admin/create.json';
		const msgError = 'Não foi possível cadastrar a categoria, por favor contate o suporte.';
		return this.post(url, category, loadEvent, msgError);
	}

	public updateCategory(id: number, category: Partial<Category>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<Category>> {
		const url = `/category/admin/${id}.json`;
		const msgError = 'Não foi possível obter a atualizar a categoria, por favor contate o suporte.';
		return this.put(url, category, loadEvent, msgError);
	}

	public getPageCategoryProductsPromotion(categoryId: number, build: Partial<CategoryParamBuild>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<Page<CategoryProductPromotion>>> {
		const url = `/category/admin/${categoryId}/products-index.json`;
		const msgError = 'Não foi possível obter a página de produtos associados a categoria, por favor contate o suporte.';
		return this.get(url, loadEvent, msgError, build);
	}

	public getListProductsCategory(categoryId: number, build: Partial<CategoryParamBuild>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<CategoryProductPromotion[]>> {
		const url = `/category/admin/${categoryId}/products-list.json`;
		const msgError = 'Não foi possível obter a lista de produtos associados a categoria, por favor contate o suporte.';
		return this.get(url, loadEvent, msgError, build);
	}

	public removeProductsCategory(categoryId: number, build: Partial<CategoryParamBuild>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<StatusRequest>> {
		const url = `/category/admin/${categoryId}/remove-products.json`;
		const msgError = 'Não foi possível remover os produtos da categoria, por favor contate o suporte.';
		return this.delete(url, loadEvent, msgError, build);
	}
  
	public addProductsCategory(categoryId: number, categoryProductForm: CategoryProductForm, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<StatusRequest>> {
		const url = `/category/admin/${categoryId}/products.json`;
		const msgError = 'Não foi possível adicionar os produtos da categoria, por favor contate o suporte.';
		return this.post(url, categoryProductForm, loadEvent, msgError);
	}


}
