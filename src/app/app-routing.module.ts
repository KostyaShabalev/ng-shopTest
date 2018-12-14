import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DisableLoginGuard } from './guards/disable-login.guard';
import { AddCategoryComponent, AdminAddProductComponent, AdminPageComponent } from './components';
import { ProductComponent } from './components';
import { CartComponent } from './components/cart/cart.component';

const childAdminRouts: Routes = [
  { path: '', redirectTo: 'statistics', pathMatch: 'full' },
  { path: 'statistics', component: MainPageComponent }, // todo replace MainPageComponent
  { path: 'category', component: AddCategoryComponent },
  { path: 'product', component: AdminAddProductComponent },
  { path: '**', redirectTo: 'statistics', pathMatch: 'full' }
];

const routes: Routes = [
  { path: '', component: MainPageComponent, pathMatch: 'full', canActivate: [ AuthGuard ] },
  { path: 'products/:id', component: ProductComponent},
  { path: 'login', component: LoginComponent, canActivate: [DisableLoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [DisableLoginGuard] },
  { path: 'admin', component: AdminPageComponent, children: childAdminRouts },
  { path: 'cart', component: CartComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
