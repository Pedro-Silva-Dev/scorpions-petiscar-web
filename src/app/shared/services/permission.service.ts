import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    private _route: ActivatedRoute,
  ) { }


  public isPermissionNavbar(): boolean {
    //@ts-ignore
    const url: string = this._route.snapshot['_routerState']?.url;
    const isPageAdmin = url?.toLowerCase().includes('admin');
    const isPageAuth = url?.toLowerCase().includes('auth');
    return (isPageAdmin || isPageAuth ) ? false : true;
  }

  public isPermissionSidebar(): boolean {
    //@ts-ignore
    const url: string = this._route.snapshot['_routerState']?.url;
    const isPageAdmin = url?.toLowerCase().includes('admin');
    const isPageAuth = url?.toLowerCase().includes('auth');
    return (isPageAdmin && !isPageAuth ) ? true : false;
  }

}
