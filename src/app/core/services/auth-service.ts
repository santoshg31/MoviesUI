import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
    private _userManager: UserManager;
    private _user: User;
    private _loginChangedSubject = new Subject<boolean>();

    loginChanged = this._loginChangedSubject.asObservable();   //this will be used to notify for any UI changes for successfull login or if login changes
    constructor() {
        const stsSettings = {
          authority: environment.stsAuthority,
          client_id: environment.clientId,
          redirect_uri: `${environment.clientRoot}signin-callback`,
          scope: 'openid profile projects-api',   //changing this to work accordingly when identity server changes and when I create my own with movies-api
          response_type: 'code',
          post_logout_redirect_uri: `${environment.clientRoot}signout-callback`          
        };
        this._userManager = new UserManager(stsSettings);
    }

    login() {
        return this._userManager.signinRedirect();
    }

    isLoggedIn(): Promise<boolean> {
        return this._userManager.getUser().then(user => {
          const userCurrent = !!user && !user.expired;
          if (this._user !== user) {
            this._loginChangedSubject.next(userCurrent);
          }
          this._user = user;
          return userCurrent;
        });
    }

    completeLogin() {
        return this._userManager.signinRedirectCallback().then(user => {
          this._user = user;
          this._loginChangedSubject.next(!!user && !user.expired);
          return user;
        });
    }
}