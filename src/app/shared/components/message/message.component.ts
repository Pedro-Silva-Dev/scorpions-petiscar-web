import { MessageToast } from './model/message-toast.model';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Unsubscribable } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  providers: [MessageService],
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {

  private _unsubscribe!: Unsubscribable

  constructor(
    private _messageService: MessageService,
    private _toastrService: ToastService
  ) { }
  
  ngOnInit() {
    this.registerEvent();
  }

  ngOnDestroy(): void {
    this._unsubscribe?.unsubscribe();
  }

  public message(messageToast: MessageToast): void {
    this._messageService.add({severity:messageToast.type, detail: messageToast.message, closable: false});
  }


  /****************** METHODS PRIVATE ******************/

  private registerEvent(): void {
   this._unsubscribe = this._toastrService.getEvent().subscribe(res => {
      if(res) {
        this.message(res);
      }
    });
  }

}
