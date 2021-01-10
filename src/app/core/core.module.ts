import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PageNotFoundComponent, NavBarComponent],
  exports:[NavBarComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CoreModule { }
