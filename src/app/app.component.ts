import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';

import { Store } from '@ngrx/store';
import * as fromStore from 'src/app/shared/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'o-shop';
  
  constructor(
    private userService: UserService, 
    private auth: AuthService, 
    public router: Router, 
    private store: Store<fromStore.ShoppingState>,
    ) {
    
    this.auth.user$.subscribe( user => {
      if(user) {
        this.userService.save(user);
        let returnUrl = localStorage.getItem('returnUrl');
        if(!returnUrl) return;
        localStorage.removeItem('returnUrl');
        router.navigateByUrl(returnUrl);
      } else {
        router.navigate(['/']);
      }
    });
    
    this.store.dispatch(fromStore.loadCategories());
    this.store.dispatch(fromStore.loadProducts());
  }
}
// 