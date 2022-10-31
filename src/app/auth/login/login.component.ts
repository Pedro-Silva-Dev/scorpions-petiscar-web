import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this._createLoginForm();
  }


  /************* METHODS PRIVATE *************/

  private _createLoginForm(): void {
    this.loginForm = this._formBuilder.group({
      username: [null],
      password: [null],
    });
  }

}
