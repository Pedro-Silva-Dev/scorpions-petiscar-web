import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/components/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PrepareLoginGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isUserAuth = this._authService.isUserAuth();
    
    if(!isUserAuth){
      return true;
    }
    this._router.navigate(['/']);
    return false;
  }
  
}
