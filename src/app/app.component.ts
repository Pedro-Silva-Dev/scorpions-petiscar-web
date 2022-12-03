import { Component } from '@angular/core';
import { PermissionService } from './shared/services/permission.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'petiscar';

  constructor(
    private _permissionService: PermissionService
  ) { }


  public isSidebar(): boolean {
    return this._permissionService.isPermissionSidebar();
  }

}
