import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SigninRedirectCallbackComponent } from './login/signin-redirect-callback/signin-redirect-callback.component';



@NgModule({
  declarations: [PageNotFoundComponent, NavBarComponent, SigninRedirectCallbackComponent],
  exports:[NavBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ]
})
export class CoreModule { }
