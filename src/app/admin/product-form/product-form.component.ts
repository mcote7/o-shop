import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})

export class ProductFormComponent implements OnInit {

  public categories$: any;

  public capsIsOn = false;

  public isSaved = false;

  public product: any = {};

  constructor( 
    categoryService: CategoryService, 
    private productService: ProductService, 
    private route: ActivatedRoute 
    ) {
    this.categories$ = categoryService.getCategories();
    
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getOneProduct(id).subscribe( p => this.product = p );
    }
  }

  ngOnInit() {
  }

  checkCapsLock(e: any) {
    if (e.keyCode) {
      if (e.getModifierState('CapsLock')) {
        this.capsIsOn = true;
      } else {
        this.capsIsOn = false;
      }
    } else {
      return;
    }
  }

  save(product: any, f: NgForm) {
    console.log("product:", product);
    this.productService.create(product);
    f.reset();
    this.saveConfirm();
  }

  saveConfirm() {
    this.isSaved = true;
    setTimeout(() => {
      this.isSaved = false;
    }, 3000);
  }

}
