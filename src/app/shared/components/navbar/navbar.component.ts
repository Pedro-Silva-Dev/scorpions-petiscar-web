import { Component, OnInit } from '@angular/core';
import { UserAuth } from 'src/app/components/auth/models/user-auth.model';
import { AuthService } from 'src/app/components/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public total = "0.00"
  public user!: UserAuth;

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this._setUserInfo();
  }


  /************************** METHODS PRIVATE **************************/

  private _setUserInfo(): void {
    this.user = this._authService.getUser();
  }

}
