import { Login } from '../../models/login.model';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { IMAGES } from 'src/app/shared/enums/images.enum';
import { AuthService } from '../../services/auth.service';
import { AUTH_NAVIGATE } from '../../enums/auth-navigate.enum';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LoginComponent implements OnInit {

  @Output() loginEvent$ = new EventEmitter<AUTH_NAVIGATE>();

  public loginUserEvent$ = new BehaviorSubject<boolean>(false);
  public logo = IMAGES.LOGO_GESTAO;
  public loginForm!: FormGroup;
  public viewPassword: boolean = false;
  public passwordUsernameInvalid = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _toastrService: ToastService,
    private _router: Router
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

  public isLoginFormValid(): boolean {
    const formValid = this.loginForm?.valid;
    return formValid;
  }

  public login(): void {
    if(this.isLoginFormValid()) {
      const userLogin: Login = {...this.loginForm.value};
      this._loginUser(userLogin);
    }else {
      this._toastrService.warning(`Não foi possível realizar o login, por favor revise os seus dados e tente novamente.`);
    }
  } 

  /************* METHODS PRIVATE *************/

  private _createLoginForm(): void {
    this.loginForm = this._formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(7)]],
    });
  }

  private _loginUser(login: Login): void {
    this.passwordUsernameInvalid = false;
    this._authService.login(login, this.loginUserEvent$).subscribe(res => {
      if(res.status == 200) {
        this._toastrService.success(`Bem-vindo ao Petiscar!`);
        this._authService.saveAuthToken(res.body);
        this._router.navigate([`/`])
      }else {
        this._toastrService.warning(`Não foi possível realizar o login, por favor tente novamente.`);
      }
    }, err => {
      if(err?.status == 403) {
        this.passwordUsernameInvalid = true;
      }
        this._toastrService.error(`Não foi possível realizar o login, revise os seus dados tente novamente.`);
    });
  }

  
}
