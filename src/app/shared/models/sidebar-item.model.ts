import { PACKS } from './../enums/packs.enum';
import { URLS } from './../enums/urls.enum';
import { ICONS } from './../enums/icons.enum';

export interface SidebarItem {
    icon: ICONS;
    iconDefault: ICONS;
    iconColor: ICONS;
    name: string;
    url: URLS;
    tooltip: string;
    order: number;
    pack: PACKS;
    roles: string[];
    selected: boolean;
}