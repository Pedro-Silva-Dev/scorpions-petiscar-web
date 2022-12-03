import { ROLES } from './shared/enums/roles.enum';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsPermissionGuard } from './shared/guards/is-permission.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'admin/auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule), canActivate: [IsPermissionGuard]},
  // { path: 'admin/auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule), canActivate: [IsPermissionGuard], data: {roles: [ROLES.Admin]}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
