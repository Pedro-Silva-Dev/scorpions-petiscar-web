import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { MODAL } from "../../../../../../shared/enums/modal.enum";
import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Category } from "../../models/category.model";
import { CategoryService } from '../../services/category.service';

@Component({
	selector: "app-modal-create-category",
	templateUrl: "./modal-create-category.component.html",
	styleUrls: ["./modal-create-category.component.css"],
})
export class ModalCreateCategoryComponent implements OnInit {

	@Output() closeModalEvent$ = new EventEmitter();
	@Output() finishEvent$ = new EventEmitter();
	@Output() displayChange = new EventEmitter<boolean>();
	
	@Input() category!: Category;
	@Input() display = false;

	public createCategoryEvent$ = new BehaviorSubject<boolean>(false);
	
	public modal = MODAL;
	public title = "";
	public labelButtonFinish = "";
	public categoryForm!: FormGroup;

	constructor(
		private _formBuilder: FormBuilder,
		private _categoryService: CategoryService,
		private _toastrService: ToastrService
	) { }
	
	ngOnInit(): void {
		this._setInfoForm();
		this._createCategoryForm();
	}

	public isFieldValid(field: string): boolean { 
		const valid = this.categoryForm.get(field)?.dirty && this.categoryForm.get(field)?.invalid ? false : true;
		return valid;
	}

	public isCategoryFormValid(): boolean { 
		return this.categoryForm?.valid;
	}

	public save(): void {
		if (this.isCategoryFormValid()) {
			if (this.category?.id) {
				this._updateCategory(this.category.id, this.categoryForm.value);
			} else {
				this._createCategory(this.categoryForm.value);
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

	/***************** METHODS PRIVATE *****************/

	private _createCategoryForm(): void {
		this.categoryForm = this._formBuilder.group({
			id: [this.category?.id ? this.category.id : null],
			name: [this.category?.name ? this.category.name : null, [Validators.required]],
			active: [(this.category?.active == null || this.category?.active == undefined) ? true : this.category.active],
		});
	}

	private _setInfoForm(): void {
		this.title = this.category?.id ? `Atualizar Categoria` : `Cadastrar Categoria`;
		this.labelButtonFinish = this.category?.id ? `Atualizar` : `Cadastrar`;
	}

	private _createCategory(category: Category): void {
		this._categoryService.createCategory(category, this.createCategoryEvent$).subscribe(res => {
			if (res.status == 201) {
				this._toastrService.success(`Categoria cadastrada com sucesso!`);
				this.finishEvent$.emit(res.body);
				this.modalEvent(false);
			}
		});
	}

	private _updateCategory(id: number, category: Category): void { 
		this._categoryService.updateCategory(id, category, this.createCategoryEvent$).subscribe(res => {
			if (res.status == 202) {
				this._toastrService.success(`Categoria atualizada com sucesso!`);
				this.finishEvent$.emit(res.body);
				this.modalEvent(false);
			}
		});
	}

}
