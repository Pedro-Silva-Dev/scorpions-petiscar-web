import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageToast } from '../component/message/model/message-toast.model';
import { TOAST_TYPE } from '../enum/enum/toast-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private messageEvent$ = new Subject<MessageToast>();

  constructor() { }
  
  public getEvent(): Subject<MessageToast> {
    return this.messageEvent$;
  }


  public success(message: string): void {
    const toast: MessageToast = {type: TOAST_TYPE.SUCCESS, message: message, summary: 'Success'};
    this.messageEvent$.next(toast);
  }

  public warning(message: string): void {
    const toast: MessageToast = {type: TOAST_TYPE.WANRNING, message: message, summary: 'Warn'};
    this.messageEvent$.next(toast);
  }

  public info(message: string): void {
    const toast: MessageToast = {type: TOAST_TYPE.INFO, message: message, summary: 'Info'};
    this.messageEvent$.next(toast);
  }

  public error(message: string): void {
    const toast: MessageToast = {type: TOAST_TYPE.ERROR, message: message, summary: 'Error'};
    this.messageEvent$.next(toast);
  }

}
