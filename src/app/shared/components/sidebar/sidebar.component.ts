import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../services/permission.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public expand: boolean = false;

  constructor(
    private _permissionService: PermissionService
  ) { }

  ngOnInit(): void {
  }

  public setExpand(): void {
    this.expand = !this.expand;
  }

  public isPermission(): boolean {
    return this._permissionService.isPermissionSidebar();
  }

}
