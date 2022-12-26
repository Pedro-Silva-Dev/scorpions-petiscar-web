import { Modal } from './../models/modal.model';
import { BehaviorSubject } from 'rxjs';
import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _modalEvent$ = new BehaviorSubject<Modal>(null);

  constructor() { }

  public getModalEvent(): BehaviorSubject<Modal> {
    return this._modalEvent$;
  }

  public show(modal: Modal): void {
    this._modalEvent$.next(modal)
  }

  public close(): void {
    this._modalEvent$.next(null);
  }


}
