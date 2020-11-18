import { UserPortalModule } from './user-portal/user-portal.module';
import { AdminPortalModule } from './admin-portal/admin-portal.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    AdminPortalModule,
    UserPortalModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
