import { PACKS } from './../../../shared/enums/packs.enum';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTERS } from 'src/app/shared/enums/routers.enum';
import { IsPermissionGuard } from 'src/app/shared/guards/is-permission.guard';

const routes: Routes = [
  { path: `${ROUTERS.CATEGORIES}`, loadChildren: () => import('./category/category.module').then(m => m.CategoryModule), canActivate: [IsPermissionGuard], data: {packs: [PACKS.STORE]}},
  { path: `${ROUTERS.PRODUCTS}`, loadChildren: () => import('./product/product.module').then(m => m.ProductModule), canActivate: [IsPermissionGuard], data: {packs: [PACKS.STORE]}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorePackRoutingModule { }
