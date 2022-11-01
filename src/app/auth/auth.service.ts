import { BaseService } from './../shared/service/base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  

}
