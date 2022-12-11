import { ChangeDetectorRef, Component, OnInit, AfterViewInit } from '@angular/core';
import { SIDEBAR_STATUS } from './shared/enums/sidebar.enum';
import { PermissionService } from './shared/services/permission.service';
import { SidebarService } from './shared/services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'petiscar';
  public sidebarClass: string = ``;

  constructor(
    private _permissionService: PermissionService,
  ) { }

   
  ngOnInit(): void {
  }

  public isSidebar(): boolean {
    const sidebar = this._permissionService.isPermissionSidebar();
    if(sidebar) {
      this.sidebarClass = `sidebar-content`
    }else {
      this.sidebarClass = ``
    }
    return sidebar;
  }


  /**************** METHODS PRIVATE ****************/

 

}
