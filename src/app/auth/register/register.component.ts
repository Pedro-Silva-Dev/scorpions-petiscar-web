import { BehaviorSubject, Subject } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMAGES } from 'src/app/shared/enum/images.enum';
import { ToastService } from 'src/app/shared/service/toast.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class RegisterComponent implements OnInit {

  public logo = IMAGES.LOGO_GESTAO;
  public registerForm!: FormGroup;
  public viewPassword: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _toastrService: ToastService
  ) { }

  ngOnInit(): void {
    this._createRegisterForm();
   
  }


  public setViewPassword(): void {
    this.viewPassword = !this.viewPassword;
  }

  public getFormValid(field: string, error: string): boolean {
    const fieldForm = this.registerForm?.get(field);
    const valid = fieldForm?.dirty && fieldForm?.hasError(error) ? true : false;
    return valid;
  }

 

  /************* METHODS PRIVATE *************/

  private _createRegisterForm(): void {
    this.registerForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(7)]],
      cofirmPassword: [null, [Validators.required, Validators.minLength(7)]],
      birthDate: [null, [Validators.required]],
    });
  }
}
