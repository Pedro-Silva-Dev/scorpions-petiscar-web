import { environment } from './../../environments/environment';
import { StatusRequest } from './../shared/model/status-request.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from './../shared/service/base.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ToastService } from '../shared/service/toast.service';

@Injectable({
  providedIn: 'root',
  
})
export class AuthService extends BaseService {

  constructor(
    private _http: HttpClient,
    private _toastrService: ToastService
  ) { 
    super(_http, _toastrService);
  }


  public isEmailValid(email: string): Observable<HttpResponse<StatusRequest>> {
    return this._http.get<StatusRequest>(`/api/user/public/valid-email.json?email=${email}`, {observe: `response`});
  }
  

}
