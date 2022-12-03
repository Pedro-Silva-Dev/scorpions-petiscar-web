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
    const isPermission = this._isPermission(route);
    const isValid = this._isValid(route);

    if((isUserAuth && isPermission) || isValid){
      return true;
    }
    this._router.navigate(['/']);
    return false;
  }
  

  /************* METHODS PRIVATE *************/

  private _isPermission(route: ActivatedRouteSnapshot): boolean { 
    let permission = false;
    const userRoles = this._authService.getUserRoles();
    const roles: string[] = route.data['roles'];

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
    let valid = false;
    const isUserAuth = this._authService.isUserAuth();
    const isUrlAuth = route.url?.find(res => res?.path?.toLowerCase() == 'auth');
    const roles: string[] = route.data['roles'];

    if(isUrlAuth && !isUserAuth && !roles?.length) {
      valid = true;
    }
    return valid;
  }
  
}
