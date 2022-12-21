import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from './shared/components/navbar/navbar.module';
import { SidebarModule } from './shared/components/sidebar/sidebar.module';
import { ToastrModule } from 'ngx-toastr';
import localeBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeBr, 'pt')

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NavbarModule,
    SidebarModule,
    ToastrModule.forRoot(),
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
