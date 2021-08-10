import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../shared/services/auth.service';

import { slideInTop } from '../../../../animations/anime';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [slideInTop]
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
