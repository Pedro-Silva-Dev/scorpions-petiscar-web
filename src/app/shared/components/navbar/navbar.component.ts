import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuth } from 'src/app/components/auth/models/user-auth.model';
import { AuthService } from 'src/app/components/auth/services/auth.service';
import { PermissionService } from '../../services/permission.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public total = "0.00"
  public user!: UserAuth;

  constructor(
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _permissionService: PermissionService
  ) { }

  ngOnInit() {
    this._setUserInfo();
  }

  public isPermission(): boolean {
    return this._permissionService.isPermissionNavbar();
  }

  /************************** METHODS PRIVATE **************************/

  private _setUserInfo(): void {
    this.user = this._authService.getUser();
  }


}
