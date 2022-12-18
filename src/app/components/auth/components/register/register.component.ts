import { ToastrService } from 'ngx-toastr';
import { RegisterUser } from '../../models/register-user.model';
import { BehaviorSubject, map, Observable, Subject, switchMap, timer, Unsubscribable, debounceTime } from 'rxjs';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { IMAGES } from 'src/app/shared/enums/images.enum';
import { AuthService } from '../../services/auth.service';
import { AUTH_NAVIGATE } from '../../enums/auth-navigate.enum';
import { Router } from '@angular/router';
import { SIDEBAR_STATUS } from 'src/app/shared/enums/sidebar.enum';
import { SidebarService } from 'src/app/shared/services/sidebar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class RegisterComponent implements OnInit {

  @Output() registerEvent$ = new EventEmitter<AUTH_NAVIGATE>();

  public registerUserEvent$ = new BehaviorSubject<boolean>(false);
  public logo = IMAGES.LOGO_GESTAO;
  public registerForm!: FormGroup;
  public viewPassword: boolean = false;
  public viewConfirmPassword: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _toastrService: ToastrService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this._createRegisterForm();
  }

  public setViewPassword(): void {
    this.viewPassword = !this.viewPassword;
  }

  public setViewConfirmePassword(): void {
    this.viewConfirmPassword = !this.viewConfirmPassword;
  }

  public getFormValid(field: string, error: string): boolean {
    const fieldForm = this.registerForm?.get(field);
    const valid = fieldForm?.dirty && fieldForm?.hasError(error) ? true : false;
    return valid;
  }

  public isPasswordValid(): boolean {
    const valid = this.registerForm.getError('password') ? true : false;
    return valid;
  }

  public navigateLogin(): void {
    this.registerEvent$.emit(AUTH_NAVIGATE.LOGIN);
  }

  public isFormValid(): boolean {
    const valid = this.registerForm?.valid && !this.registerForm?.pending ? true : false;
    return valid;
  }

  public register(): void {
    if(this.isFormValid()) {
      const user: RegisterUser = {...this.registerForm.value, username: this.registerForm?.value?.email};
      this._registerUser(user);
    }else {
      this._toastrService.warning(`Não foi possível realizar o cadastro, por favor revise os seus dados e tente novamente.`);
    }
  }
 

  /************* METHODS PRIVATE *************/

  private _createRegisterForm(): void {
    this.registerForm = this._formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email], [this._getValidEmail.bind(this)]],
      username: [null],
      password: [null, [Validators.required, Validators.minLength(7)]],
      cofirmPassword: [null, [Validators.required, Validators.minLength(7)]],
    }, {validators: this._isConfirmPassword.bind(this)});
  }

  private _getValidEmail(formControl: AbstractControl): any {
    const email = formControl?.root?.get('email')?.value;
    if(email) {
      return timer(0).pipe(switchMap(() =>  this._authService.isEmailValid(email).pipe(
        map(res => {
        if(res?.status == 200) {
          return res.body?.success ? null : {isEmailRegistred: true};
        }else {
          return null;
        }
      }))))
    }else{
      const valor = new Observable();
      return valor;
    }
  }

  private _isConfirmPassword(formControl: AbstractControl): any {
    const passwordField = `password`;
    const confirmPasswordField = `cofirmPassword`;

    if(!formControl) {
      return null;
    }

    const password = formControl?.root?.get(passwordField);
    const confirmPassword = formControl?.root?.get(confirmPasswordField);

    if(!password?.dirty || !confirmPassword?.dirty) {
      return null;
    }

    if(!password?.value && !confirmPassword?.value) {
      this.registerForm?.get(passwordField)?.setErrors(null);
      this.registerForm?.get(confirmPasswordField)?.setErrors(null);
      return null;
    }

    if(password?.value == confirmPassword?.value && password?.value?.length >= 6 && confirmPassword?.value?.length >= 6) {
      this.registerForm?.get(passwordField)?.setErrors(null);
      this.registerForm?.get(confirmPasswordField)?.setErrors(null);
      return null;
    }
    return {password: true};
  }

  private _registerUser(user: RegisterUser): void {
    this._authService.createUser(user, this.registerUserEvent$).subscribe(
      res => {
        if(res.status == 201) {
          this._toastrService.success(`Bem-vindo ao Petiscar!`);
          this._router.navigate([`/`]);
        }
      });
  }
  

}
