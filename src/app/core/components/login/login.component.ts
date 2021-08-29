import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { slideInTop } from 'src/animations/anime';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [slideInTop]
})
export class LoginComponent {
  
  public isLoggingIn = false;
  
  constructor( private auth: AuthService ) {
  }
  
  login() {
    this.auth.login();
    this.isLoggingIn = true;
  }
}
