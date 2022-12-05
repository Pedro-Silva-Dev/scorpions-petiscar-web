import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SIDEBAR_STATUS } from '../enums/sidebar.enum';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private _sidebarEvent$ = new BehaviorSubject<SIDEBAR_STATUS>(SIDEBAR_STATUS.HIDE);
  private _sidebarKey: string = `expand`;

  constructor() { }

  public getStatusExpandEvent(): BehaviorSubject<SIDEBAR_STATUS> {
    return this._sidebarEvent$;
  }

  public setStatusExpandEvent(status: SIDEBAR_STATUS): void {
    this._setStatusExpand(status);
    this._sidebarEvent$.next(status);
  }

  public getStatusExpand(): SIDEBAR_STATUS {
    const status = window.localStorage.getItem(this._sidebarKey);
    return status ? JSON.parse(status) : null;
  }

  /************** METHODS PRIVATE **************/

  private _setStatusExpand(status: SIDEBAR_STATUS): void {
    window.localStorage.removeItem(this._sidebarKey);
    window.localStorage.setItem(this._sidebarKey, JSON.stringify(status));
  }

  private _getStatusExpand(): boolean {
    const status = window.localStorage.getItem(this._sidebarKey);
    return status ? true : false;
  }

  private _isSidebarExpanded(): boolean {
    return this._getStatusExpand();
  }

}
