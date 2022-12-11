import { MODAL } from "./../../enums/modal.enum";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
	selector: "app-modal",
	templateUrl: "./modal.component.html",
	styleUrls: ["./modal.component.css"],
	changeDetection: ChangeDetectionStrategy.Default
})
export class ModalComponent implements OnInit {

  @Output() closeModalEvent$ = new EventEmitter();

  @Input() display = false;
  @Input() title = "Titulo";
  @Input() class: MODAL = MODAL.MD; 

  constructor() {
  //empty
  }

  ngOnInit(): void {
  //empty
  }

  public closeModal(): void {
    this.closeModalEvent$.emit(true);
  }

}
