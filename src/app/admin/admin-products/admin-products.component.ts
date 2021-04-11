import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  public products$: any;

  public productKey$: any;

  constructor( private productService: ProductService) {
    this.products$ = this.productService.getAll();
  }

  ngOnInit() {
  }

}
