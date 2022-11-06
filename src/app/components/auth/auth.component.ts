import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AUTH_NAVIGATE } from './enums/auth-navigate.enum';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public typesNavigate = AUTH_NAVIGATE;
  public navigate = AUTH_NAVIGATE.LOGIN;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  public directNavigate(value: AUTH_NAVIGATE): void {
    this.navigate = value;
    this._changeDetectorRef.detectChanges();
  }

}
