import { PromotionService } from './../../services/promotion.service';
import { Promotion } from './../../models/promotion.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { MODAL } from 'src/app/shared/enums/modal.enum';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-modal-create-promotion',
  templateUrl: './modal-create-promotion.component.html',
  styleUrls: ['./modal-create-promotion.component.css']
})
export class ModalCreatePromotionComponent implements OnInit {

	@Output() closeModalEvent$ = new EventEmitter();
	@Output() finishEvent$ = new EventEmitter();
	@Output() displayChange = new EventEmitter<boolean>();
	
	@Input() promotion!: Promotion;
	@Input() display = false;

	public createPromotionEvent$ = new BehaviorSubject<boolean>(false);
	
	public modal = MODAL;
	public title = "";
	public labelButtonFinish = "";
	public promotionForm!: FormGroup;
	public minDate = new Date();

	constructor(
		private _formBuilder: FormBuilder,
		private _promotionService: PromotionService,
		private _toastrService: ToastrService
	) { }
	
	ngOnInit(): void {
		this._setInfoForm();
		this._createPromotionForm();
	}

	public isFieldValid(field: string): boolean { 
		const valid = this.promotionForm.get(field)?.dirty && this.promotionForm.get(field)?.invalid ? false : true;
		return valid;
	}

	public isPromotionFormValid(): boolean { 
		return this.promotionForm?.valid;
	}

	public save(): void {
		if (this.isPromotionFormValid()) {
			this._normalizeDateForm();
			if (this.promotion?.id) {
				this._updatePromotion(this.promotion.id, this.promotionForm.value);
			} else {
				this._createPromotion(this.promotionForm.value);
			}
		}
	}

	public closeModal(): void {		
		this.modalEvent(false);
	}

	public modalEvent(event: boolean): void { 
		this.display = event;
		this.displayChange.emit(this.display);
	}

  public isDiscountPercentage(): boolean {
    const percentageDiscount = this.promotionForm.get('percentageDiscount')?.value;
    return percentageDiscount ? true : false;
  }

  public setDiscountDefault(): void {
    this.promotionForm.get('discount')?.setValue(0);
  }

  public validDate(type: string) {
	if(!this._isDateValid()) {
		this.promotionForm.get(type).setValue(null);
		this._toastrService.warning(`A data final não pode ser menor que a data inicial. `)
	}
  }


/***************** METHODS PRIVATE *****************/

private _createPromotionForm(): void {
	this.promotionForm = this._formBuilder.group({
		id: [this.promotion?.id ? this.promotion.id : null],
		name: [this.promotion?.name ? this.promotion.name : null, [Validators.required]],
		discount: [this.promotion?.discount ? this.promotion.discount : null, [Validators.required]],
		dhi: [this.promotion?.dhi ? this.promotion.dhi : null, [Validators.required]],
		dhf: [this.promotion?.dhf ? this.promotion.dhf : null, [Validators.required]],
		active: [(this.promotion?.active == null || this.promotion?.active == undefined) ? true : this.promotion.active],
		percentageDiscount: [(this.promotion?.percentageDiscount == null || this.promotion?.percentageDiscount == undefined) ? true : this.promotion.percentageDiscount],
	});
}

private _setInfoForm(): void {
	this.title = this.promotion?.id ? `Atualizar Promoção` : `Cadastrar Promoção`;
	this.labelButtonFinish = this.promotion?.id ? `Atualizar` : `Cadastrar`;
}

private _createPromotion(promotion: Promotion): void {
	this._promotionService.createPromotion(promotion, this.createPromotionEvent$).subscribe(res => {
		if (res.status == 201) {
			this._toastrService.success(`Promoção cadastrada com sucesso!`);
			this.finishEvent$.emit(res.body);
			this.modalEvent(false);
		}
	});
}

private _updatePromotion(id: number, promotion: Promotion): void { 
	this._promotionService.updatePromotion(id, promotion, this.createPromotionEvent$).subscribe(res => {
		if (res.status == 202) {
			this._toastrService.success(`Promoção atualizada com sucesso!`);
			this.finishEvent$.emit(res.body);
			this.modalEvent(false);
		}
	});
}

	private _normalizeDateForm(): void {
		const dhi = this.promotionForm.get('dhi').value;
		const dhf = this.promotionForm.get('dhf').value;
		let dhiFormat: any = dhi;
		let dhfFormat: any = dhf;

		try {
			dhiFormat = formatDate(dhi, 'dd/MM/yyyy HH:mm:ss', 'en-US')
		} catch (error) {
			
		}
		try {
			dhfFormat = formatDate(dhf, 'dd/MM/yyyy HH:mm:ss', 'en-US')
		} catch (error) {
			
		}

		this.promotionForm.get('dhi').setValue(dhiFormat);
		this.promotionForm.get('dhf').setValue(dhfFormat);
	}

	private _isDateValid(): boolean {
		const dhi = this.promotionForm.get('dhi').value;
		const dhf = this.promotionForm.get('dhf').value;

		if(!dhi) {
			return false;
		}
		if(dhf && new Date(dhi) > new Date(dhf)) {
			return false;
		}
		if(dhf && new Date(dhf) < new Date(dhi)) {
			return false;
		}
		return true;
	}

}
