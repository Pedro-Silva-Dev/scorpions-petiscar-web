import { ActivatedRouteSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../models/register-user.model';
import { Observable, BehaviorSubject, take, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { StatusRequest } from 'src/app/shared/models/status-request.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Login } from '../models/login.model';
import { UserAuth } from '../models/user-auth.model';
import jwt_decode from "jwt-decode";
//@ts-ignore
import Hashids from "hashids";
import { ROLES } from 'src/app/shared/enums/roles.enum';
import { AuthParamBuild } from 'src/app/shared/models/param-build/auth-param.build.model';
import { User } from '../../admin/user/models/user.model';

@Injectable({
  providedIn: 'root',
  
})
export class AuthService extends BaseService {

  private _authKey = 'auth';
  private _salt = environment.salt;
  private _lengthSalt = environment.lengthSalt;

  constructor(
    private _http: HttpClient,
    private _toastrService: ToastService,
  ) { 
    super(_http, _toastrService);
  }

  
  private _getHashId(valor: string): number {
    const hashids = new Hashids(this._salt, this._lengthSalt);
    if(valor){
      const ids = hashids.decode(valor);
      return ids?.length ? Number.parseInt(ids[0].toString()) : 0;
    }
    return 0;
  }


  public saveAuthToken(token: string): void {
    this.removeAuthToken();
    window.sessionStorage.setItem(this._authKey, token);
  }

  public removeAuthToken(): void {
    window.sessionStorage.removeItem(this._authKey);
  }

  public getAuthToken(): string {
    const token: any = window.sessionStorage.getItem(this._authKey);
    return token ? token : ``;
  }

  public isUserAuth(): boolean {
    const user = this.getUser();
    return user?.userKey ? true : false;
  }

  public isUserAdmin(): boolean {
    let admin = false;
    const user = this.getUser();
    if(user) {
      const roles = user.roles?.split(',');
      const isAdmin = roles?.find(res => res == ROLES.Admin);
      admin = isAdmin ? true : false;
    }
    return admin;
  }



  public getUser(): UserAuth {
    const token = this.getAuthToken();
    if(token){
      const user: UserAuth = jwt_decode(token);
      return user;
    }
    return Object.create({});
  }

  public getUserId(): number {
    const user = this.getUser();
    const userId = user?.userKey ? this._getHashId(user.userKey) : 0;
    return userId;
  }

  public getUserCompanyId(): number {
    const user = this.getUser();
    const userId = user?.companyKey ? this._getHashId(user.companyKey) : 0;
    return userId;
  }

  public getUserOfficeId(): number {
    const user = this.getUser();
    const userId = user?.officeKey ? this._getHashId(user.officeKey) : 0;
    return userId;
  }

  public getUserRoles(): string[] {
    let roles: string[] = [];
    const user = this.getUser();
    if(user) {
      roles = user.roles?.split(',');
    }
    return roles;
  }

  public isEmailValid(build: Partial<AuthParamBuild>, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<StatusRequest>> {
    const url = `/user/public/valid-email.json`;
    const msgError = `Não o possível realizar a validação do emai, por favor tente novamente.`;
    return this.get(url, loadEvent, msgError, build);
  }

  public createUser(user: RegisterUser, loadEvent?: BehaviorSubject<boolean>): Observable<HttpResponse<User>> {
    const url = `/user/public/create.json`;
    const msgError = `Não foi possível realizar o cadastro, por favor tente novamente.`;
    return this.post(url, user, loadEvent, msgError);
  }

  public login(login: Login, loadEvent?: BehaviorSubject<boolean>): Observable<any> {
    const url = `/auth/signin.json`;
    //@ts-ignore
    return this._http.post<any>(`${this._baseUrl}${url}`, login, { responseType: 'text', observe: `response` }).pipe(take(1));
  }

}


