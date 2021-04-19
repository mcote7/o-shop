import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

import { fadeIn, listAnimationWrapCard, listAnimationItemCard, slideInTop, popin } from '../../animations/anime';

import { Product } from '../../models/product';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [fadeIn,listAnimationWrapCard,listAnimationItemCard,slideInTop,popin]
})

export class ProductsComponent implements OnInit, OnDestroy {

  public products: any[] = [];
  public filteredProducts: any[] = [];
  public subscription: Subscription;
  public subscription2: Subscription;

  public cart: any;

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

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
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
