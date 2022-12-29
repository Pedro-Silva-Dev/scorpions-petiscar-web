import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef } from '@angular/core';
import { MODAL } from 'src/app/shared/enums/modal.enum';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css'],
	changeDetection: ChangeDetectionStrategy.Default
})
export class ModalComponent implements OnInit {

  @Input() template: TemplateRef<any>;
  @Input() display = false;
  @Input() title = 'Titulo';
  @Input() class: MODAL = MODAL.MD; 

  @ContentChild(TemplateRef) modalTemplate: TemplateRef<any>;

  constructor(
    private _modalService: ModalService
  ) {
  //empty
  }

  ngOnInit(): void {
  	this.modalTemplate = this.template;
  }

  public closeModal(): void {
  	this._modalService.close();
  }

}
