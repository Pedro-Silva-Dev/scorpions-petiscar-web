import { SIDEBAR_STATUS } from './../../enums/sidebar.enum';
import { IMAGES } from 'src/app/shared/enums/images.enum';
import { ROLES } from './../../enums/roles.enum';
import { ICONS } from './../../enums/icons.enum';
import { SidebarItem } from './../../models/sidebar-item.model';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PermissionService } from '../../services/permission.service';
import { AuthService } from 'src/app/components/auth/services/auth.service';
import { URLS } from '../../enums/urls.enum';
import { ActivatedRoute } from '@angular/router';
import { UserAuth } from 'src/app/components/auth/models/user-auth.model';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  public expand: boolean = false;
  public arrowLeftIcon = ICONS.ARROW_LEFT;
  public userProfileImg = IMAGES.USER_PROFILE;
  public sidebarItens: SidebarItem[] = [];
  public sidebarLogout!: SidebarItem;
  public userRoles: string[] = [];
  public user!: UserAuth;
  public permission: boolean = false;
  
  constructor(
    private _permissionService: PermissionService,
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _sidebarService: SidebarService,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    this._setStatus();
    this._setInfoUser();
    this._setSidebarItens();
    this._setSidebarLogout();
  }

  public setExpand(): void {
    this.expand = !this.expand;
    this.setStatusExpand()
  }

  public setStatusExpand(): void {
    const status = this.expand ? SIDEBAR_STATUS.EXPAND : SIDEBAR_STATUS.HIDE;
    this._sidebarService.setStatusExpandEvent(status);
    setTimeout(() => {
      this.expand = this._sidebarService.getStatusExpand() == SIDEBAR_STATUS.EXPAND ? true : false;
    }, 0);
  }

  public isPermission(): boolean {
    this.permission = this._permissionService.isPermissionSidebar();
    if(this.permission) {
      setTimeout(() => {
        this.setStatusExpand();
      }, 0);
    }
    return this.permission;
  }

  public isRolePermission(sidebarItem: SidebarItem): boolean {
    let permission = false;
    const userRoles = this._authService.getUserRoles();
    
    if(!sidebarItem?.roles?.length) {
      permission = true;
    }
    if(sidebarItem?.roles && userRoles?.length) {
      userRoles?.forEach(userRole => {
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

  public logout(): void {
    this._authService.logout();
  }

  /***************** METHODS PRIVATE *****************/

  private _setSidebarItens(): void {
    this._setSidebarItem(`Dashboard`, ICONS.DASHBOARD, URLS.DASHBOARD, `Dashboard`, [ROLES.ADMIN]);
    this._setSidebarItem(`Usuários`, ICONS.USER, URLS.USERS, `Usuários`, [ROLES.ADMIN]);
    this._setSidebarItem(`Categorias`, ICONS.CATEGORY, URLS.CATEGORIES, `Categorias`, [ROLES.ADMIN]);

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
    this.user = this._authService.getUser();
  }

  private _setSidebarLogout(): void {
    this.sidebarLogout = {
      name: 'Sair',
      icon: ICONS.LOGOUT,
      url: ``,
      tooltip: `Sair`,
      order: 0,
      roles: [],
    }
  }

  private _setStatus(): void {
    this.expand = this._sidebarService.getStatusExpand() == SIDEBAR_STATUS.EXPAND ? true : false;
  }

}
