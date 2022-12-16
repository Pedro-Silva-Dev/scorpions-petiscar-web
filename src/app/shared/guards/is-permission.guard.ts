import { ROLES } from 'src/app/shared/enums/roles.enum';
import { PACKS } from './../enums/packs.enum';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/components/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsPermissionGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthService
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isUserAuth = this._authService.isUserAuth();
    const isValid = this._isValid(route);

    if(isUserAuth && isValid){
      return true;
    }
    this._router.navigate(['/']);
    return false;
  }
  

  /************* METHODS PRIVATE *************/

  private _isRoleValid(route: ActivatedRouteSnapshot): boolean { 
    let permission = false;
    const userRoles = this._authService.getUserRoles();
    const roles: ROLES[] = route.data['roles'];

    if(roles?.length) {
      userRoles?.forEach(userRole => {
        const isUserPermission = roles.find(role => role == userRole);
        if(isUserPermission) {
          permission = true;
        }
      });
    }else {
      permission = true;
    }
    return permission;
  }

  private _isValid(route: ActivatedRouteSnapshot): boolean { 
    const _isRoleValid = this._isRoleValid(route);
    const _isAcessPack = this._isAcessPack(route);
    return (_isRoleValid && _isAcessPack) ? true : false;
  }

  private _isAcessPack(route: ActivatedRouteSnapshot): boolean {
    let permission = false;
    const companyPacks: PACKS[] = this._authService.getCompanyPacks();
    const packs: PACKS[] = route.data['packs'];

    if(packs?.length) {
      companyPacks?.forEach(companyPack => {
        const isUserPermission = packs.find(pack => pack == companyPack);
        if(isUserPermission) {
          permission = true;
        }
      });
    }else {
      permission = true;
    }
    return permission;
  }
  
}
