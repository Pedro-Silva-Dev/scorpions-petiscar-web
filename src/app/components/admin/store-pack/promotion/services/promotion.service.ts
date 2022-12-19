import { Promotion } from './../models/promotion.model';
import { PromotionParamBuild } from './../models/promotion-param.build.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/shared/services/base.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/page.model';

@Injectable({
  providedIn: 'root'
})
export class PromotionService extends BaseService {

  constructor(
    private _http: HttpClient,
    private _toastrService: ToastrService,
  ) { 
    super(_http, _toastrService);
  }

  public getPagePromotion(build: Partial<PromotionParamBuild>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<Page<Promotion>>> {
    const url = `/promotion/admin/index.json`;
    const msgError = `Não foi possível obter a página de promoções, por favor contate o suporte.`;
    return this.get(url, loadEvent, msgError, build);
  }

  public getListPromotion(build: Partial<PromotionParamBuild>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<Promotion[]>> {
    const url = `/promotion/admin/list.json`;
    const msgError = `Não foi possível obter a lista de promoções, por favor contate o suporte.`;
    return this.get(url, loadEvent, msgError, build);
  }

  public getPromotion(id: number, build: Partial<PromotionParamBuild>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<Promotion>> {
    const url = `/promotion/admin/${id}.json`;
    const msgError = `Não foi possível obter a promoção, por favor contate o suporte.`;
    return this.get(url, loadEvent, msgError, build);
  }

  public createPromotion(promotion: Partial<Promotion>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<Promotion>> {
    const url = `/promotion/admin/create.json`;
    const msgError = `Não foi possível cadastrar a promoção, por favor contate o suporte.`;
    return this.post(url, promotion, loadEvent, msgError);
  }

  public updatePromotion(id: number, promotion: Partial<Promotion>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<Promotion>> {
    const url = `/promotion/admin/${id}.json`;
    const msgError = `Não foi possível obter a atualizar a promoção, por favor contate o suporte.`;
    return this.put(url, promotion, loadEvent, msgError);
  }



  
}
