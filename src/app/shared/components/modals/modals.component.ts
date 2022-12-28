import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MODAL_TYPE } from './../../enums/modal-type.model';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Modal } from '../../models/modal.model';
import { Unsubscribable } from 'rxjs';

@Component({
	selector: 'app-modals',
	templateUrl: './modals.component.html',
	styleUrls: ['./modals.component.css']
})
export class ModalsComponent implements OnInit, OnDestroy {

	private _unsubscribe: Unsubscribable;

	public display = true;
	public modal: Modal;
	public displayModal = false;
	public displayLargeModal = false;

	constructor(
    private _modalService: ModalService,
    private _changeDetectorRef: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this._setModalEvent();
	}

	ngOnDestroy(): void {
		this._unsubscribe?.unsubscribe();
	}


	/****************** METHODS PRIVATE ******************/

	private _setModalEvent(): void {
		this._unsubscribe = this._modalService.getModalEvent().subscribe(res => {
			if(res) {
				this.display = true;
				this.modal = res;
				if(res.type == MODAL_TYPE.DEFAULT) {
					this.displayModal = true;
				}else if(res.type == MODAL_TYPE.LARGE) {
					this.displayLargeModal = true;
				}
			}else {
				this._closeModal();
			}
		});
	}

	private _closeModal(): void {
		this.display = false;
		this._changeDetectorRef.detectChanges();
		setTimeout(() => {
			this.displayModal = false;
			this.displayLargeModal = false;  
		}, 500);
    
	}

}
