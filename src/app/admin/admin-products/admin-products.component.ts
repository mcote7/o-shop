import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  public products: any[];

  public filteredProducts: any[];

  public subscription: Subscription;

  constructor( private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(prod => this.filteredProducts = this.products = prod);
  }

  ngOnInit() {
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
