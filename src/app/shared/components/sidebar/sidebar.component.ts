import { PACKS } from './../../enums/packs.enum';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SIDEBAR_STATUS } from "./../../enums/sidebar.enum";
import { IMAGES } from "src/app/shared/enums/images.enum";
import { ROLES } from "./../../enums/roles.enum";
import { ICONS } from "./../../enums/icons.enum";
import { ItemMenu, SidebarItem } from "./../../models/sidebar-item.model";
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { PermissionService } from "../../services/permission.service";
import { AuthService } from "src/app/components/auth/services/auth.service";
import { URLS } from "../../enums/urls.enum";
import { ActivatedRoute } from "@angular/router";
import { UserAuth } from "src/app/components/auth/models/user-auth.model";
import { SidebarService } from "../../services/sidebar.service";
import {MenuItem} from 'primeng/api';
import { Unsubscribable } from 'rxjs';


@Component({
	selector: "app-sidebar",
	templateUrl: "./sidebar.component.html",
	styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit, OnDestroy {

	private _unsubscribe: Unsubscribable;

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
	
	ngOnDestroy(): void {
		this._unsubscribe?.unsubscribe();
	}

	public isPermission(): boolean {
		this.permission = this._permissionService.isPermissionSidebar();
		return this.permission;
	}

	public isRolePermission(sidebarItem: SidebarItem): boolean {
		let permission = false;
		const userRoles = this._authService.getUserRoles();
		const packs = this._authService.getCompanyPacks();

		const permissionRole = this._isPermissionRole(sidebarItem, userRoles)
		const permissionPack = this._isPermissionPack(sidebarItem, packs);

		if(permissionRole && permissionPack) {
			permission = true;
		}
		
		return permission;
	}

	public isItemSelected(sidebarItem: SidebarItem): boolean {
		//@ts-ignore
		const url: string = this._route.snapshot["_routerState"]?.url;
		const isSelectedPage = (sidebarItem?.url && url?.toLowerCase().includes(sidebarItem.url)) ? true : false;
		const isSelectedPack = (sidebarItem?.pack && url?.toLowerCase().includes(sidebarItem.pack?.toLowerCase())) ? true : false;
		const selected = (isSelectedPage || isSelectedPack) ? true : false; 
		sidebarItem.selected = selected
		return selected;
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
		this.sidebarItens = [];
		this._setSidebarItem("Dashboard", ICONS.DASHBOARD, ICONS.DASHBOARD_WHITE, URLS.DASHBOARD, PACKS.EMPTY, "Dashboard", null, [ROLES.ADMIN], 1);
		this._setSidebarItem("Loja", ICONS.STORE, ICONS.STORE_WHITE, URLS.EMPTY, PACKS.STORE, "Gestão da Loja", this._getItemsMenu({name: `Categorias`, url: URLS.CATEGORIES}, {name: `Produtos`, url: URLS.PRODUCTS}), [ROLES.ADMIN], 2);
		this._setSidebarItem("Usuários", ICONS.USER, ICONS.USER_WHITE, URLS.USERS, PACKS.EMPTY, "Usuários", null, [ROLES.ADMIN], 3);

		this.sidebarItens?.sort((a,b) => a.order > b.order ? 1 : -1);
	}

	private _setSidebarItem(name: string, icon: ICONS, iconColor: ICONS, url: URLS, pack: PACKS, tooltip: string, items: MenuItem[] = [], rolesItem?: ROLES[], orderItem?: number): void {
		const order = orderItem ? orderItem : this._getLastOrderSidebarItem();
		const roles = rolesItem?.length ? rolesItem : [];
		const item: SidebarItem = {
			name,
			icon,
			iconColor,
			iconDefault: icon,
			url,
			tooltip,
			order,
			pack,
			roles,
			selected: false,
			items
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
			pack: PACKS.EMPTY,
			tooltip: "Sair",
			order: 0,
			roles: [],
			items: null,
			selected: false,
		};
	}

	private _setStatus(): void {
		this.expand = this._sidebarService.getStatusExpand() == SIDEBAR_STATUS.EXPAND ? true : false;
	}

	private _isPermissionRole(sidebarItem: SidebarItem, roles: string[]): boolean {
		let permission = false;
		if(sidebarItem?.roles && roles?.length) {
			roles?.forEach(userRole => {
				const rolePermission = sidebarItem?.roles?.find(itemRole => itemRole == userRole);
				if(rolePermission) {
					permission = true;
				}
			});
		}
		return permission;
	}

	private _isPermissionPack(sidebarItem: SidebarItem, packs: PACKS[]): boolean {
		let permission = false;
		if(sidebarItem?.pack) {
			const packPermission = packs?.find(pack => pack?.toLowerCase()?.trim() == sidebarItem.pack?.toLowerCase()?.trim());
			if(packPermission) {
				permission = true;
			}
		}else {
			permission = true;
		}
		return permission;
	}

	private _getItemsMenu(...items: ItemMenu[]): MenuItem[] {
		let menuItems: MenuItem[] = [];
		items?.forEach(item => {
			menuItems.push({ label: item.name, routerLink: item.url });
		});
		return menuItems;
	}

}
