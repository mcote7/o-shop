import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  public categories$: any;

  constructor( categoryService: CategoryService, private productService: ProductService ) {
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit() {
  }

  save(product: any, f: NgForm) {
    console.log("product:", product);
    this.productService.create(product);
    f.reset();
  }

}
