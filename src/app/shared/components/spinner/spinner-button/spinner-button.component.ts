import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner-button',
  templateUrl: './spinner-button.component.html',
  styleUrls: ['./spinner-button.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SpinnerButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
