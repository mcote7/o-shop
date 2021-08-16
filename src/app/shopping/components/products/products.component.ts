import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromStore from 'src/app/shared/store';
import { Category } from 'src/app/shared/models/category';
import { Product } from 'src/app/shared/models/product';


// working on removing services from component 
import { ProductService } from 'src/app/shared/services/product.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

import { 
  popin, 
  fadeIn, 
  slideInTop, 
  listAnimationWrap, 
  listAnimationItem, 
  listAnimationWrapCard, 
  listAnimationItemCard } from 'src/animations/anime';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    popin,
    fadeIn,
    slideInTop,
    listAnimationWrap,
    listAnimationItem,
    listAnimationWrapCard,
    listAnimationItemCard,
  ]
})

export class ProductsComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  public subscription2: Subscription;

  public products: any[] = [];
  public filteredProducts: any[] = [];

  public cart: any;
  public totItemsInCat: number = 0;

  // new for store
  public categories$: Observable<Category[]>;
  public categoriesLoaded$: Observable<boolean>;
  public categoriesLoading$: Observable<boolean>;
  public category: string;

  public isAnimeDone = false;

  constructor( 
    private store: Store<fromStore.ShoppingState>, 
    private productService: ProductService, 
    private cartService: ShoppingCartService, 
    public route: ActivatedRoute, 
    ) { 
    
    // get all products & filter by category from route params 
    this.subscription = this.productService.getAll().subscribe(prod => {
      this.products = prod;
      route.queryParamMap.subscribe( params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ? 
          this.products.filter( p => p.category === this.category ) : 
          this.products;
      })
    });
    
    // get cart from local storage 
    let cartId = localStorage.getItem('cartId');
    this.subscription2 = this.cartService.getCart(cartId).subscribe(cart => this.cart = cart);
  }

  ngOnInit() {
    // this.store.dispatch(fromStore.loadCategories()); in app.ts as to call only once 
    this.categoriesLoading$ = this.store.select(fromStore.getCategoriesLoading);
    this.categories$ = this.store.select(fromStore.getAllCategories);
  }




  addToCart(product: Product, i?: string) {
    this.cartService.addToCart(product);
    let btn = document.getElementById(i);
    btn.animate([
      {boxShadow: '0 0 0 0 hsla(29, 79%, 56%, 1)', transform: 'scale(1.025)'},
      {boxShadow: '0 0 10px 20px rgba(255,150,44,0)', transform: 'scale(1)'}
    ], {
      duration: 150
    });
  }

  removeFromCart(product: Product, i: string) {
    this.cartService.removeFromCart(product);
    // console.log("heyheyhey",i)
    let btn = document.getElementById(i);
    btn.animate([
      {transform: 'rotateX(360deg)', backgroundColor: 'hsla(29, 79%, 56%, 1)'},
      {transform: 'rotateX(0deg)', backgroundColor: 'hsla(29, 79%, 56%, 1)'}
    ], {
      duration: 150
    });
  }





  getQuantity(product: Product) {
    if(!this.cart) {
      return 0;
    }
    let item = this.cart.items[product.key];
    // console.log("hey", this.cart)
    return item ? item.quantity : 0;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
