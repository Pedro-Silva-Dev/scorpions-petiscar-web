import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTERS } from 'src/app/shared/enums/routers.enum';

const routes: Routes = [
  { path: `${ROUTERS.CATEGORIES}`, loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)},
  { path: `${ROUTERS.PRODUCTS}`, loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorePackRoutingModule { }
