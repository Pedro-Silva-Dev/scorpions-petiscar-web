import { PromotionParamBuild } from './models/promotion-param.build.model';
import { PromotionService } from './services/promotion.service';
import { Promotion } from './models/promotion.model';
import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Page } from 'src/app/shared/models/page.model';
import { Paginator } from 'src/app/shared/components/paginator/models/paginator.model';
import { Status } from 'src/app/shared/models/status.model';
import { ModalService } from 'src/app/shared/services/modal.service';
import { MODAL_TYPE } from 'src/app/shared/enums/modal-type.model';
import { MODAL } from 'src/app/shared/enums/modal.enum';
import { Modal } from 'src/app/shared/models/modal.model';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  private _page = 0;
	private _size = 10;

	public promotionLoadEvent$ = new BehaviorSubject<boolean>(false);
	public promotionUpdateEvent$ = new BehaviorSubject<boolean>(false);
	public closeModalEvent$ = new BehaviorSubject<boolean>(false);
	public modalPromotionEvent$ = new BehaviorSubject<boolean>(false);

	public pagination: Page<Promotion> = null;
	public promotions: Promotion[] = [];
	public promotion!: Promotion;
	public isDisplayModal = false;
	public isDisplayFilter = false;
	public filterForm!: FormGroup;
	public status: Status[] = [];
	public typeDiscounts: Status[] = [];

	constructor(
		private _promotionService: PromotionService,
		private _toastService: ToastrService,
		private _changeDetectorRef: ChangeDetectorRef,
		private _formBuilder: FormBuilder,
		private _modalService: ModalService
	) { }

	ngOnInit(): void {
		this._setStatus();
		this._setTypeDiscounts();
		this._setCreateFilterForm();
		this._setPromotionsPage();
	}

	public displayModalPromotion(template: TemplateRef<any>, promotion?: Promotion): void {
		if (promotion) {
			this.promotion = {...promotion};
		} else {
			this.promotion = null;
		}
		const modal: Modal = {template, title: this.promotion ? `Atualizar Promoção` : `Cadastrar Promoção`, type: MODAL_TYPE.DEFAULT, class: MODAL.MD}
		this._modalService.show(modal);
	}

	public updateStatusPromotion(promotion: Promotion): void {
		promotion.active = !promotion.active;
		this._updatePromotion(promotion?.id, promotion);
	}


	public closeFilterModal(): void {
		setTimeout(() => {
			this.isDisplayFilter = false;
			this._changeDetectorRef.detectChanges();
		}, 0);
	}

	public updatePromotionInPage(promotion: Promotion): void { 
		if (promotion) {
			this._updatePromotionInPage(promotion);
		}
	}

	public changePage(page: Paginator): void {
		this._page = page.page;
		this._setPromotionsPage();
	}

	public search(): void {
		this._page = 0;
		this._setPromotionsPage();
		this.closeFilterModal();
	}

	public clearFilters(): void {
		this.filterForm.reset();
		this.search();
	}

	/********************* METHODS PRIVATE *********************/

	private _setCreateFilterForm(): void {
		this.filterForm = this._formBuilder.group({
			name: [null],
			discountMin: [null],
			discountMax: [null],
			dhi: [null],
			dhf: [null],
			status: [null],
			percentageDiscount: [null],
		});
	}

	private _setPromotionsPage(): void {
		const form = this.filterForm.value;
		const build: Partial<PromotionParamBuild> = { page: this._page, size: this._size, name: form?.name, discountMin: form?.discountMin, discountMax: form?.discountMax, dhi: form?.dhi, dhf: form?.dhf, status: form?.status, percentageDiscount: form?.percentageDiscount };
		this._promotionService.getPagePromotion(build, this.promotionLoadEvent$).subscribe(res => {
			if (res.status == 200) {
				this.pagination = res.body;
				this.promotions = this.pagination?.content;
			}
		});
	}

	private _updatePromotion(id: number, promotion: Promotion): void { 
		this._promotionService.updatePromotion(id, promotion, this.promotionUpdateEvent$).subscribe(res => {
			if (res.status == 202) {
				this._toastService.success(`Promoção atualizada com sucesso!`);
				this._updatePromotionInPage(promotion);
			}
		});
	}

	private _updatePromotionInPage(promotion: Promotion): void {
		let isNewPromotion = true;
		this.promotions?.forEach((res, index) => {
			if (res.id == promotion?.id) {
				this.promotions[index] = { ...promotion };
				isNewPromotion = false;
			}
		});
		if(isNewPromotion) {
			this.promotions.push(promotion);
		}
		this._changeDetectorRef.detectChanges();
	}

	private _setStatus(): void {
		const active: Status =  {id: 1, name: `Habilitado`, status: true};
		const disable: Status =  {id: 2, name: `Desabilitado`, status: false};
		this.status = [active, disable];
   	}

	   private _setTypeDiscounts(): void {
		const money: Status =  {id: 1, name: `Dinheiro`, status: false};
		const percentage: Status =  {id: 2, name: `Percentual`, status: true};
		this.typeDiscounts = [percentage, money];
   	}


}
