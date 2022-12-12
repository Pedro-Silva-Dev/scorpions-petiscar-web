import { Component, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  @Output() displayChange = new EventEmitter<boolean>();

  @Input() title: string = `Pesquisar`;
  @Input() headerTemplate: TemplateRef<any>
  @Input() bodyTemplate: TemplateRef<any>
  @Input() footerTemplate: TemplateRef<any>
  @Input() display = false;

  public iconFloat = false;

  constructor() { }

  ngOnInit(): void {
  }


  @HostListener('window:scroll', ['$event'])
    private _onScroll(event: any) {
      const scrollY = window.scrollY ? true : false;
      this.iconFloat = scrollY;
    }

  public setDisplay(): void {
    this.display = !this.display;
    this.displayChange.emit(this.display);
  }

}
