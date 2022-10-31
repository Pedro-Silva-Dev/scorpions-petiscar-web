import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public loginEvent$ = new BehaviorSubject<boolean>(true);

  constructor() { }

  ngOnInit(): void {
  }

}
