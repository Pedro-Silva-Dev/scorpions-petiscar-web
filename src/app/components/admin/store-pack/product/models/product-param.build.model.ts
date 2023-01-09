import { FormControl } from '@angular/forms';
import { Product } from './product.model';

export interface ProductParamBuild  extends Product{
    page: number;
    size: number;
    priceMin: number;
    priceMax: number;
    categoryId: number;
}

export interface ProductParamBuildForm  {
    name: FormControl<string>;
    description: FormControl<string>;
    priceMin: FormControl<number>;
    priceMax: FormControl<number>;
    categoryId: FormControl<number>;
    status: FormControl<boolean>;
}