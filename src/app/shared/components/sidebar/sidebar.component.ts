/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SIDEBAR_STATUS } from "./../../enums/sidebar.enum";
import { IMAGES } from "src/app/shared/enums/images.enum";
import { ROLES } from "./../../enums/roles.enum";
import { ICONS } from "./../../enums/icons.enum";
import { SidebarItem } from "./../../models/sidebar-item.model";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { PermissionService } from "../../services/permission.service";
import { AuthService } from "src/app/components/auth/services/auth.service";
import { URLS } from "../../enums/urls.enum";
import { ActivatedRoute } from "@angular/router";
import { UserAuth } from "src/app/components/auth/models/user-auth.model";
import { SidebarService } from "../../services/sidebar.service";
// 763cad
@Component({
	selector: "app-sidebar",
	templateUrl: "./sidebar.component.html",
	styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {

	public expand = false;
	public arrowLeftIcon = ICONS.ARROW_LEFT;
	public userProfileImg = IMAGES.USER_PROFILE;
	public sidebarItens: SidebarItem[] = [];
	public sidebarLogout!: SidebarItem;
	public userRoles: string[] = [];
	public user!: UserAuth;
	public permission = false;
  
	constructor(
    private _permissionService: PermissionService,
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _sidebarService: SidebarService,
	) { }


	ngOnInit(): void {
		this._setStatus();
		this._setInfoUser();
		this._setSidebarItens();
		this._setSidebarLogout();
	}
	

	public isPermission(): boolean {
		this.permission = this._permissionService.isPermissionSidebar();
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
		const url: string = this._route.snapshot["_routerState"]?.url;
		const isSelected = url?.toLowerCase().includes(sidebarItem.url);
		sidebarItem.selected = isSelected; 
		return isSelected;
	}

	public logout(): void {
		this._authService.logout();
	}

	public getSidebarIcon(item: SidebarItem, selected: boolean): void {
		if (selected) { 
			item.icon = item.iconColor;
		} else {
			item.icon = item.iconDefault;
		}
	}

	/***************** METHODS PRIVATE *****************/

	private _setSidebarItens(): void {
		this._setSidebarItem("Dashboard", ICONS.DASHBOARD, ICONS.DASHBOARD, ICONS.DASHBOARD_WHITE, URLS.DASHBOARD,  "Dashboard", [ROLES.ADMIN], 1);
		this._setSidebarItem("Categorias", ICONS.CATEGORY, ICONS.CATEGORY, ICONS.CATEGORY_WHITE, URLS.CATEGORIES, "Categorias", [ROLES.ADMIN], 2);
		this._setSidebarItem("Produtos", ICONS.PRODUCT, ICONS.PRODUCT, ICONS.PRODUCT_WHITE, URLS.PRODUCTS, "Produtos", [ROLES.ADMIN], 3);
		this._setSidebarItem("Usuários", ICONS.USER, ICONS.USER, ICONS.USER_WHITE, URLS.USERS, "Usuários", [ROLES.ADMIN], 4);

		this.sidebarItens?.sort((a,b) => a.order > b.order ? 1 : -1);
	}

	private _setSidebarItem(name: string, icon: ICONS, iconDefault: ICONS, iconColor: ICONS, url: URLS, tooltip: string, rolesItem?: ROLES[], orderItem?: number): void {
		const order = orderItem ? orderItem : this._getLastOrderSidebarItem();
		const roles = rolesItem?.length ? rolesItem : [];
		const item: SidebarItem = {
			name,
			icon,
			iconColor,
			iconDefault,
			url,
			tooltip,
			order,
			roles,
			selected: false,
		};
		this.sidebarItens.push(item);
	}

	private _getLastOrderSidebarItem(): number {
		const orders = this.sidebarItens?.map(res => res.order);
		const sortedOrder = orders?.sort((a,b) => a > b ? 1 : -1);
		const lastOrder = (sortedOrder?.length && sortedOrder.length !- 0 ) ? (sortedOrder[0] + 1) : 0;
		return lastOrder;
	}

	private _setInfoUser(): void {
		this.userRoles = this._authService.getUserRoles();
		this.user = this._authService.getUser();
	}

	private _setSidebarLogout(): void {
		this.sidebarLogout = {
			name: "Sair",
			icon: ICONS.LOGOUT,
			iconColor: ICONS.LOGOUT_WHITE,
			iconDefault: ICONS.LOGOUT,
			url: URLS.EMPTY,
			tooltip: "Sair",
			order: 0,
			roles: [],
			selected: false,
		};
	}

	private _setStatus(): void {
		this.expand = this._sidebarService.getStatusExpand() == SIDEBAR_STATUS.EXPAND ? true : false;
	}


}
