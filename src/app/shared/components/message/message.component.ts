import { MessageToast } from './model/message-toast.model';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Unsubscribable, take, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  providers: [MessageService],
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {

  public loadMessageEvent$ = new BehaviorSubject<boolean>(false);

  private _unsubscribe!: Unsubscribable

  constructor(
    private _messageService: MessageService,
    private _toastrService: ToastService,
    private _primengConfig: PrimeNGConfig,
  ) { }
  
  ngOnInit() {
    this._primengConfig.ripple = true;
    this.registerEvent();
  }

  ngOnDestroy(): void {
    this._unsubscribe?.unsubscribe();
  }

  public message(messageToast: MessageToast): void {
    this._messageService.add({ severity: messageToast.type, detail: messageToast.message, closable: true });
  }


  /****************** METHODS PRIVATE ******************/

  private registerEvent(): void {
   this._unsubscribe = this._toastrService.getEvent().subscribe(res => {
     if (res) {
        this.message(res);
      }
    });
  }

}
