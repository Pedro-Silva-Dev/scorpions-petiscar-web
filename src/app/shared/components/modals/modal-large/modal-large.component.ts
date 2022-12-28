import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { MODAL } from 'src/app/shared/enums/modal.enum';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
	selector: 'app-modal-large',
	templateUrl: './modal-large.component.html',
	styleUrls: ['./modal-large.component.css']
})
export class ModalLargeComponent implements OnInit {

  @Input() template: TemplateRef<any>;
  @Input() filterTemplate: TemplateRef<any>;
  @Input() display = false;
  @Input() title = 'Titulo';
  @Input() class: MODAL = MODAL.MD; 

  @ContentChild(TemplateRef) modalTemplate: TemplateRef<any>;
  @ContentChild(TemplateRef) modalFilterTemplate: TemplateRef<any>;

  constructor(
    private _modalService: ModalService
  ) {
  //empty
  }
 
  ngOnInit(): void {
  	this.modalTemplate = this.template;
  	this.modalFilterTemplate = this.filterTemplate;
  }

  public closeModal(): void {
  	this._modalService.close();
  }
}
