import { ROLES } from './shared/enums/roles.enum';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsPermissionGuard } from './shared/guards/is-permission.guard';
import { PrepareLoginGuard } from './shared/guards/prepare-login.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/public/home/home.module').then(m => m.HomeModule) },
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule), canActivate: [PrepareLoginGuard] },
  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule), canActivate: [IsPermissionGuard], data: {roles: [ROLES.ADMIN]} },
  { path: 'public', loadChildren: () => import('./components/public/public.module').then(m => m.PublicModule) },
  { path: 'modals', loadChildren: () => import('./shared/components/modals/modals.module').then(m => m.ModalsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
