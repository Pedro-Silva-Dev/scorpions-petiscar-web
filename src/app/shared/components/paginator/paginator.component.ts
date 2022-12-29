import { Page } from 'src/app/shared/models/page.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Paginator } from 'primeng/paginator';

@Component({
	selector: 'app-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Output() changePageEvent$ = new EventEmitter<any>();

  @Input() page: Page<any> = null;

  constructor() {
  	//empty
  }

  ngOnInit(): void {
  	//empty
  }

  public changePage(page: Paginator): void {
  	this.changePageEvent$.emit(page);
  }

  public isDisplayPage(): boolean { 
  	return (this.page?.totalElements > this.page?.size) ? true : false;
  }


}
