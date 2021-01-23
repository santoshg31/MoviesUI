import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-signout-redirect-callback',
  templateUrl: './signout-redirect-callback.component.html'
})
export class SignoutRedirectCallbackComponent implements OnInit {

  constructor(private _authService: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
    this._authService.completeLogout().then(_ => {
      this._router.navigate(['/'], { replaceUrl: true });
    })
  }

}
