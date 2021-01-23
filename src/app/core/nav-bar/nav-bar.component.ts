import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLoggedIn:boolean = false;
  constructor(private _authService:AuthService) { 
    this._authService.loginChanged.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    })
  }

  ngOnInit(): void {
    this._authService.isLoggedIn().then(loggedIn =>{   //this will check if the user navigates to other site and comes back to ensure the user stays logged in provided the token doesn't expire.
      this.isLoggedIn = this.isLoggedIn;
    })
  }

  login() {
    this._authService.login();
  }
}
