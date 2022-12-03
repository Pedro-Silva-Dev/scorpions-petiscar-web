import { ROLES } from './../../enums/roles.enum';
import { ICONS } from './../../enums/icons.enum';
import { SidebarItem } from './../../models/sidebar-item.model';
import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../services/permission.service';
import { AuthService } from 'src/app/components/auth/services/auth.service';
import { URLS } from '../../enums/urls.enum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public expand: boolean = false;
  public sidebarItens: SidebarItem[] = [];
  public userRoles: string[] = [];

  constructor(
    private _permissionService: PermissionService,
    private _authService: AuthService,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._setInfoUser();
    this._setSidebarItens();
  }

  public setExpand(): void {
    this.expand = !this.expand;
  }

  public isPermission(): boolean {
    return this._permissionService.isPermissionSidebar();
  }

  public isRolePermission(sidebarItem: SidebarItem): boolean {
    let permission = false;
    
    if(!sidebarItem?.roles?.length) {
      permission = true;
    }
    if(sidebarItem?.roles && this.userRoles?.length) {
      this.userRoles?.forEach(userRole => {
        const rolePermission = sidebarItem?.roles?.find(itemRole => itemRole == userRole);
        if(rolePermission) {
          permission = true;
        }
      });
    }
    return permission;
  }

  public isItemSelected(sidebarItem: SidebarItem): boolean {
    //@ts-ignore
    const url: string = this._route.snapshot['_routerState']?.url;
    const isSelected = url?.toLowerCase().includes(sidebarItem.url);
    return isSelected;
  }

  /***************** METHODS PRIVATE *****************/

  private _setSidebarItens(): void {
    this._setSidebarItem(`Dashboard`, ICONS.DASHBOARD, URLS.DASHBOARD, `Dashboard`, [ROLES.ADMIN]);
    this._setSidebarItem(`Users`, ICONS.DASHBOARD, URLS.USERS, `Usuários`, [ROLES.ADMIN]);

    this.sidebarItens?.sort((a,b) => a.order > b.order ? 1 : -1);
  }

  private _setSidebarItem(name: string, icon: ICONS, url: URLS, tooltip: string, rolesItem?: ROLES[], orderItem?: number): void {
    const order = orderItem ? orderItem : this._getLastOrderSidebarItem();
    const roles = rolesItem?.length ? rolesItem : [];
    const item: SidebarItem = {
      name,
      icon,
      url,
      tooltip,
      order,
      roles
    }
    this.sidebarItens.push(item);
  }

  private _getLastOrderSidebarItem(): number {
    const orders = this.sidebarItens?.map(res => res.order);
    const sortedOrder = orders?.sort((a,b) => a > b ? 1 : -1);
    const lastOrder = (sortedOrder?.length && sortedOrder?.length !- 0 ) ? (sortedOrder[0] + 1) : 0;
    return lastOrder;
  }

  private _setInfoUser(): void {
    this.userRoles = this._authService.getUserRoles();
  }


}
