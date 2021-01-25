import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SigninRedirectCallbackComponent } from './login/signin-redirect-callback/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './login/signout-redirect-callback/signout-redirect-callback.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';



@NgModule({
  declarations: [PageNotFoundComponent, NavBarComponent, SigninRedirectCallbackComponent, SignoutRedirectCallbackComponent, UnauthorizedComponent],
  exports:[NavBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
