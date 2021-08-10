import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { CategoryService } from '../shared/services/category.service';
import { ProductService } from '../shared/services/product.service';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';

import { fadeIn, listAnimationWrapCard, listAnimationItemCard, slideInTop, popin, toastNotification, listAnimationWrap, listAnimationItem, slideInLeft,slideInBottom } from '../../animations/anime';

import { Product } from '../shared/models/product';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [fadeIn,listAnimationWrapCard,listAnimationItemCard,slideInTop,popin,toastNotification,listAnimationWrap,listAnimationItem, slideInLeft, slideInBottom]
})

export class ProductsComponent implements OnInit, OnDestroy {

  public products: any[] = [];
  public filteredProducts: any[] = [];
  public subscription: Subscription;
  public subscription2: Subscription;

  public cart: any;

  public totItemsInCat: number = 0;

  public categories$: any;
  public category: string;

  public isAnime = false;
  public isAnimeDone = false;

  constructor( 
    private productService: ProductService, 
    categoryService: CategoryService, 
    route: ActivatedRoute,
    private cartService: ShoppingCartService) { 

    this.subscription = this.productService.getAll().subscribe(prod => {
      this.products = prod;
      
      route.queryParamMap.subscribe( params => {
        this.category = params.get('category');
        
        this.filteredProducts = (this.category) ? 
          this.products.filter( p => p.category === this.category ) : 
          this.products;
      })
    });
    this.categories$ = categoryService.getCategories();
    
    let cartId = localStorage.getItem('cartId');
    this.subscription2 = this.cartService.getCart(cartId).subscribe(cart => this.cart = cart);
  }

  ngOnInit() {
    if( this.categories$ && this.filteredProducts ) {
      this.isAnime = true;
    } else {
      setTimeout(() => {
        if( this.categories$ && this.filteredProducts ) {
          this.isAnime = true;
        } else {
          alert('error getting data')
        }
      }, 2000);
    }
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
