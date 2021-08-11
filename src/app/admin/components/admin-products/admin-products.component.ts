import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { ProductService } from 'src/app/shared/services/product.service';

import {listAnimationWrap, listAnimationItem, fadeIn } from 'src/animations/anime';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
  animations: [listAnimationWrap, listAnimationItem, fadeIn]
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  public products: any[];

  public filteredProducts: any[];

  public subscription: Subscription;

  public loadBuffer = true;

  constructor( private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(prod => this.filteredProducts = this.products = prod);
  }

  ngOnInit() {
    // setTimeout(() => {
    //   this.loadBuffer = false;
    // }, 2000);
    if(this.filteredProducts) {
      this.loadBuffer = false;
    } else {
      setTimeout(() => {
        if (this.filteredProducts) {
          this.loadBuffer = false;
        } else {
          alert('error getting data')
        }
      }, 2000);
    }
  }

  searchProducts(query: string) {
    console.log("searching for", query)
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : 
      this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
