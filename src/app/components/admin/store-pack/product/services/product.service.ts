import { Product } from '../models/product.model';
import { ProductParamBuild } from '../models/product-param.build.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/shared/services/base.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/page.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  constructor(
    private _http: HttpClient,
    private _toastrService: ToastrService,
  ) { 
    super(_http, _toastrService);
  }


  public getPageProduct(build: Partial<ProductParamBuild>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<Page<Product>>> {
    const url = `/product/admin/index.json`;
    const msgError = `Não foi possível obter a página de produtos, por favor contate o suporte.`;
    return this.get(url, loadEvent, msgError, build);
  }

  public getListProduct(build: Partial<ProductParamBuild>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<Product[]>> {
    const url = `/product/admin/list.json`;
    const msgError = `Não foi possível obter a lista de produtos, por favor contate o suporte.`;
    return this.get(url, loadEvent, msgError, build);
  }

  public getProduct(id: number, build: Partial<ProductParamBuild>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<Product>> {
    const url = `/product/admin/${id}.json`;
    const msgError = `Não foi possível obter o produto, por favor contate o suporte.`;
    return this.get(url, loadEvent, msgError, build);
  }

  public createProduct(product: Partial<Product>, build: Partial<ProductParamBuild>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<Product>> {
    const url = `/product/admin/create.json`;
    const msgError = `Não foi possível cadastrar o produto, por favor contate o suporte.`;
    return this.post(url, product, loadEvent, msgError, build);
  }

  public updateProduct(id: number, product: Partial<Product>, build: Partial<ProductParamBuild>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<Product>> {
    const url = `/product/admin/${id}.json`;
    const msgError = `Não foi possível atualizar o produto, por favor contate o suporte.`;
    return this.put(url, product, loadEvent, msgError, build);
  }

}
