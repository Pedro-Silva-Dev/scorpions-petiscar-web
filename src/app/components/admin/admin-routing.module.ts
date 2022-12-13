import { ROUTERS } from './../../shared/enums/routers.enum';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: `${ROUTERS.DASHBOARD}`, loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: `${ROUTERS.CATEGORIES}`, loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)},
  { path: `${ROUTERS.PRODUCTS}`, loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},
  { path: `${ROUTERS.USERS}`, loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
