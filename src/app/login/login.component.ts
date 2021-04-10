import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoggingIn = false;


  constructor( private auth: AuthService ) {
  }


  ngOnInit() {
  }

  login() {
    this.auth.login();
    this.isLoggingIn = true;
  }

}
