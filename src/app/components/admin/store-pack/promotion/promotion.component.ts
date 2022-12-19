import { PromotionParamBuild } from './models/promotion-param.build.model';
import { PromotionService } from './services/promotion.service';
import { Promotion } from './models/promotion.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Page } from 'src/app/shared/models/page.model';
import { Paginator } from 'src/app/shared/components/paginator/models/paginator.model';

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

	constructor(
		private _promotionService: PromotionService,
		private _toastService: ToastrService,
		private _changeDetectorRef: ChangeDetectorRef,
		private _formBuilder: FormBuilder
	) { }

	ngOnInit(): void {
		this._setCreateFilterForm();
		this._setPromotionsPage();
	}

	public displayModalPromotion(promotion?: Promotion): void {
		this.modalPromotionEvent$.next(false);
		this._changeDetectorRef.detectChanges();
		if (promotion) {
			this.promotion = {...promotion};
		} else {
			this.promotion = null;
		}
		this.isDisplayModal = true;
		this.modalPromotionEvent$.next(true);
	}

	public updateStatusPromotion(promotion: Promotion): void {
		promotion.active = !promotion.active;
		this._updatePromotion(promotion?.id, promotion);
	}

	public closeModal(): void {
		setTimeout(() => {
			this.isDisplayModal = false;
			this._changeDetectorRef.detectChanges();
		}, 0);
	}

	public closeFilterModal(): void {
		setTimeout(() => {
			this.isDisplayFilter = false;
			this._changeDetectorRef.detectChanges();
		}, 0);
	}

	public updateCategoryInPage(promotion: Promotion): void { 
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
			name: [null]
		});
	}

	private _setPromotionsPage(): void {
		const form = this.filterForm.value;
		const build: Partial<PromotionParamBuild> = { page: this._page, size: this._size, name: form?.name };
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

}
