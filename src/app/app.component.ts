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
    private _sidebarService: SidebarService,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

   
  ngOnInit(): void {
    this._setSidebarStatusEvent();
  }


  /**************** METHODS PRIVATE ****************/

  private _isSidebar(): boolean {
    return this._permissionService.isPermissionSidebar();
  }

  private _setSidebarStatusEvent(): void {
    this._sidebarService.getStatusExpandEvent().subscribe(res => {
        if(this._isSidebar()) {
          if(res == SIDEBAR_STATUS.EXPAND) {
            this.sidebarClass = `sidebar-expand-content`;
          }else {
            this.sidebarClass = `sidebar-content`
          }
        }else {
          this.sidebarClass = ``;
        }
    });
  }

}
