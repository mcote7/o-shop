import { Component, OnDestroy, OnInit } from '@angular/core';

import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

import { fadeIn, listAnimationWrapCard, listAnimationItemCard, slideInTop } from '../../animations/anime';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [fadeIn,listAnimationWrapCard,listAnimationItemCard,slideInTop]
})

export class ProductsComponent implements OnInit, OnDestroy {

  public products: any[];
  public subscription: Subscription;

  public categories$: any;

  public isAnime = false;

  constructor( private productService: ProductService, categoryService: CategoryService ) { 
    this.subscription = this.productService.getAll().subscribe(prod => this.products = prod);

    this.categories$ = categoryService.getCategories();
  }

  ngOnInit() {
    setTimeout(() => {
      this.isAnime = true;
    }, 2000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
