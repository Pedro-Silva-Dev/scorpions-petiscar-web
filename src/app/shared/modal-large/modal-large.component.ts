import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-modal-large',
  templateUrl: './modal-large.component.html',
  styleUrls: ['./modal-large.component.css']
})
export class ModalLargeComponent implements OnInit {

  @Input() display = false;
  @Input() title = "Titulo";

  constructor(
    private _modalService: ModalService
  ) {
    //empty
  }

  ngOnInit(): void {
  //empty
  }

  public closeModal(): void {
    this._modalService.close();
  }

}
