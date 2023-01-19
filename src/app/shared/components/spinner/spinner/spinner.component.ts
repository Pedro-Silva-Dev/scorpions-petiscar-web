import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.css'],
	changeDetection: ChangeDetectionStrategy.Default
})
export class SpinnerComponent implements OnInit {

  @Input() blocked = true;

  constructor() { 
  	//empty
  }

  ngOnInit(): void {
  	//empty
  }

}
