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
          scope: 'openid profile movies-api',   //changing this to work accordingly when identity server changes and when I create my own with movies-api Identity server
          response_type: 'code',
          //post_logout_redirect_uri: `${environment.clientRoot}signout-callback`,  
          metadata: {
          issuer: `${environment.stsAuthority}`,
          authorization_endpoint: `${environment.stsAuthority}authorize?audience=movies-api`,  //audience parameter ensures Auth0 returns JWT access token otherwise which we will later analyze for claims
          jwks_uri: `${environment.stsAuthority}.well-known/jwks.json`,
          token_endpoint: `${environment.stsAuthority}oauth/token`,
          userinfo_endpoint: `${environment.stsAuthority}userinfo`,
          end_session_endpoint: `${environment.stsAuthority}v2/logout?client_id=${environment.clientId}&returnTo=${encodeURI(environment.clientRoot)}signout-callback`
          }        
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

    logout() {
        return this._userManager.signoutRedirect();
    }
    
    completeLogout() {
        this._user = null;
        return this._userManager.signoutRedirectCallback();
    }
    getAccessToken() {
        return this._userManager.getUser().then(user => {
          if (!!user && !user.expired) {
            return user.access_token;
          }
          else {
            return null;
          }
        });
    }


}