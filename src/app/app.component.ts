import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';

import { fadeOutLong } from 'src/animations/anime';

import { Store } from '@ngrx/store';
import * as fromStore from 'src/app/shared/store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeOutLong]
})
export class AppComponent {
  
  title = 'o-shop';

  public categoriesLoading$: Observable<boolean>;
  public productsLoading$: Observable<boolean>;
  public cartLoading$: Observable<boolean>;
  
  constructor(
    public router: Router, 
    private auth: AuthService, 
    private userService: UserService, 
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
    this.store.dispatch(fromStore.loadCart());
    this.categoriesLoading$ = this.store.select(fromStore.getCategoriesLoading);
    this.productsLoading$ = this.store.select(fromStore.getProductsLoading);
    this.cartLoading$ = this.store.select(fromStore.getCartLoading);
  }
}
// 