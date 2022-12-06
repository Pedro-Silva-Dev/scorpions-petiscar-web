import { CategoryProduct } from './../models/category-product.model';
import { Category } from './../models/category.model';
import { Page } from './../../../../shared/models/page.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CategoryParamBuild } from '../models/category-param.build.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  constructor(
    private _http: HttpClient,
    private _toastrService: ToastService,
  ) { 
    super(_http, _toastrService);
  }

  public getPageCategory(build: Partial<CategoryParamBuild>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<Page<Category>>> {
    const url = `/category/admin/index.json`;
    const msgError = `Não foi possível obter a página de categorias, por favor contate o suporte.`;
    return this.get(url, loadEvent, msgError, build);
  }

  public getListCategory(build: Partial<CategoryParamBuild>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<Category[]>> {
    const url = `/category/admin/list.json`;
    const msgError = `Não foi possível obter a lista de categorias, por favor contate o suporte.`;
    return this.get(url, loadEvent, msgError, build);
  }

  public getCategory(id: number, build: Partial<CategoryParamBuild>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<Category>> {
    const url = `/category/admin/${id}.json`;
    const msgError = `Não foi possível obter a categoria, por favor contate o suporte.`;
    return this.get(url, loadEvent, msgError, build);
  }

  public createCategory(category: Partial<Category>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<Category>> {
    const url = `/category/admin/create.json`;
    const msgError = `Não foi possível cadastrar a categoria, por favor contate o suporte.`;
    return this.post(url, category, loadEvent, msgError);
  }

  public updateCategory(id: number, category: Partial<Category>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<Category>> {
    const url = `/category/admin/${id}.json`;
    const msgError = `Não foi possível obter a atualizar a categoria, por favor contate o suporte.`;
    return this.put(url, category, loadEvent, msgError);
  }

  public getPageProductsCategory(build: Partial<CategoryParamBuild>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<Page<CategoryProduct>>> {
    const url = `/public/products-index.json`;
    const msgError = `Não foi possível obter a página de produtos associados a categoria, por favor contate o suporte.`;
    return this.get(url, loadEvent, msgError, build);
  }

  public getListProductsCategory(build: Partial<CategoryParamBuild>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<CategoryProduct[]>> {
    const url = `/public/products-list.json`;
    const msgError = `Não foi possível obter a lista de produtos associados a categoria, por favor contate o suporte.`;
    return this.get(url, loadEvent, msgError, build);
  }


}
