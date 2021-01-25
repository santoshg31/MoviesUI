import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninRedirectCallbackComponent } from './core/login/signin-redirect-callback/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './core/login/signout-redirect-callback/signout-redirect-callback.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './core/unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path:'movies',
    loadChildren: () => import('./movie/movie.module').then(m => m.MovieModule)
  },
  { path: 'signin-callback', component: SigninRedirectCallbackComponent },
  { path: 'signout-callback', component: SignoutRedirectCallbackComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {path:'',redirectTo:'/movies', pathMatch: 'full'},
  {path:'**',component:PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
