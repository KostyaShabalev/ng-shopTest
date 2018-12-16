import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material/material.module';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptor, ErrorInterceptor } from './interceptors';
import { WishlistPageComponent } from './components/wishlist-page/wishlist-page.component';
import { ProductComponent } from './components';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminPageComponent } from './components';
import { AdminAddProductComponent } from './components';
import { AddCategoryComponent } from './components';
import { CartComponent } from './components/cart/cart.component';
import { NotificationService } from './services/';

@NgModule({
  declarations: [
    AppComponent,
    WishlistPageComponent,
    ProductComponent,
    HeaderComponent,
    MainPageComponent,
    LoginComponent,
    RegisterComponent,
    AdminPageComponent,
    AdminAddProductComponent,
    AddCategoryComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
