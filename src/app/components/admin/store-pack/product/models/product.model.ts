import { FormControl } from '@angular/forms';
export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    urlPhoto: string;
    dhc: string;
    dhu: string;
    active: boolean;
    categories?: any;
    categoryIds?: number[];
    companyId: number;
    selected?: boolean;
}

export interface ProductForm {
    id: FormControl<number>;
    name: FormControl<string>;
    price: FormControl<number>;
    description: FormControl<string>;
    urlPhoto: FormControl<string>;
    dhc: FormControl<string>;
    dhu: FormControl<string>;
    active: FormControl<boolean>;
    categoryIds: FormControl<number[]>;
    companyId: FormControl<number>;
}