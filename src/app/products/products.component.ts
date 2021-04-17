import { Component, OnDestroy, OnInit } from '@angular/core';

import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

import { fadeIn, listAnimationWrapCard, listAnimationItemCard, slideInTop } from '../../animations/anime';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [fadeIn,listAnimationWrapCard,listAnimationItemCard,slideInTop]
})

export class ProductsComponent implements OnInit, OnDestroy {

  public products: any[] = [];
  public filteredProducts: any[] = [];
  public subscription: Subscription;

  public categories$: any;
  public category: string;

  public isAnime = false;
  public isAnimeDone = false;

  constructor( private productService: ProductService, categoryService: CategoryService, route: ActivatedRoute ) { 

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
