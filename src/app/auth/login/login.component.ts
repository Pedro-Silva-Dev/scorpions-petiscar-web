import { IMAGES } from '../../shared/enum/images.enum';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastService } from 'src/app/shared/service/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LoginComponent implements OnInit {

  public logo = IMAGES.LOGO_GESTAO;
  public loginForm!: FormGroup;
  public viewPassword: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _toastrService: ToastService
  ) { }

  ngOnInit(): void {
    this._createLoginForm();
   
  }


  public setViewPassword(): void {
    this.viewPassword = !this.viewPassword;
  }


  /************* METHODS PRIVATE *************/

  private _createLoginForm(): void {
    this.loginForm = this._formBuilder.group({
      username: [null],
      password: [null],
    });
  }

}
