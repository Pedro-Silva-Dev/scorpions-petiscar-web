import { IMAGES } from '../../shared/enum/images.enum';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastService } from 'src/app/shared/service/toast.service';
import { BehaviorSubject } from 'rxjs';
import { AUTH_NAVIGATE } from '../enum/auth-navigate.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LoginComponent implements OnInit {

  @Output() loginEvent$ = new EventEmitter<AUTH_NAVIGATE>();

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

  public getFormValid(field: string, error: string): boolean {
    const fieldForm = this.loginForm?.get(field);
    const valid = fieldForm?.dirty && fieldForm?.hasError(error) ? true : false;
    return valid;
  }

  public navigateRegister(): void {
    this.loginEvent$.emit(AUTH_NAVIGATE.REGISTER);
  }

  /************* METHODS PRIVATE *************/

  private _createLoginForm(): void {
    this.loginForm = this._formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(7)]],
    });
  }

}
