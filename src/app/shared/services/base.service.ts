import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, take, map, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected _baseUrl = environment.baseUrl;

  constructor(
    protected readonly http: HttpClient,
    protected readonly toastrService: ToastService
  ) { }
  
  protected get(url: string, eventComponent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false), msgError: string = `Ocorre um erro no processo, por favor contate o suporte.`, build?: any): Observable<HttpResponse<any>> {
    eventComponent?.next(true);
    //@ts-ignore
    return this.http.get<any>(`${this._baseUrl}${url}?success=true${this._getInfoBuild(build)}`, {observe: 'response'}).pipe(catchError(
      (err: any) => {
        this.toastrService.error(msgError);
        eventComponent?.next(false);
        return throwError(err);
      }
    )).pipe(take(1)).pipe(map((r) => {
      eventComponent?.next(false);
      return r;
    }));
  }
  
  protected post(url: string, data: any, eventComponent: BehaviorSubject<boolean> = new BehaviorSubject<any>(false), msgError: string = `Ocorre um erro no processo, por favor contate o suporte.`, build?: any): Observable<HttpResponse<any>>{
    eventComponent?.next(true);
    // @ts-ignore
    return this.http.post<any>(`${this._baseUrl}${url}?success=true${this._getInfoBuild(build)}`, data, {observe: 'response'}).pipe(catchError(
      (err: any) => {
        this.toastrService.error(msgError);
        eventComponent?.next(false);
        return throwError(err);
      }
    )).pipe(take(1)).pipe(map((r) => {
      eventComponent?.next(false);
      return r;
    }));
  }
  
  protected put(url: string, data: any, eventComponent: BehaviorSubject<boolean> = new BehaviorSubject<any>(false), msgError: string = `Ocorre um erro no processo, por favor contate o suporte.`, build?: any): Observable<HttpResponse<any>>{
    eventComponent?.next(true);
    //@ts-ignore
    return this.http.put<any>(`${this._baseUrl}${url}?success=true${this._getInfoBuild(build)}`, data, {observe: 'response'}).pipe(catchError(
      (err: any) => {
        this.toastrService.error(msgError);
        eventComponent?.next(false);
        return throwError(err);
      }
    )).pipe(take(1)).pipe(map((r) => {
      eventComponent?.next(false);
      return r;
    }));
  }
  
  protected delete(url: string, eventComponent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false), msgError: string = `Ocorre um erro no processo, por favor contate o suporte.`, build?: any): Observable<HttpResponse<any>>{
    eventComponent?.next(true);
    //@ts-ignore
    return this.http.delete<boolean>(`${this._baseUrl}${url}?success=true${this._getInfoBuild(build)}`, {observe: 'response'}).pipe(catchError(
      (err: any) => {
        this.toastrService.error(msgError);
        eventComponent?.next(false);
        return throwError(err);
      }
    )).pipe(take(1)).pipe(map((r) => {
      eventComponent?.next(false);
      return r;
    }));
  }
  
  /******************* METHODS PRIVATE *******************/
  
  private _getInfoBuild(paramsBuild: any): string {
    const build = this._getParamsBuild(paramsBuild);
    const arrayActive = build?.filter(r => r);
    const arrayNormalized = arrayActive?.map(r => {
      const params = r.split('=');
      //@ts-ignore
      const data = params[1]?.replaceAll(',', '@');
      return `${params[0]}=${data}`;
    })
    //@ts-ignore
    const params = arrayNormalized?.toString()?.replaceAll(',', '')?.replaceAll('@', ',')
    return params;
  }

  private _getParamsBuild(build: any): string[] {
    let array: string[] = [];
    if (build) {
      Object.keys(build)?.forEach(key => {
        //@ts-ignore
        if (build[key] != null && build[key] != undefined) {
          //@ts-ignore
          const item = `&${key}=${encodeURIComponent(build[key])}`;
          array.push(item);
        }
      });
    }
    return array;
  }

}
