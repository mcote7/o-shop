import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})

export class ProductFormComponent implements OnInit, OnDestroy {

  public categories$: any;

  public capsIsOn = false;

  public isSaved = false;
  public isUpdated = false;

  public product: any = {};

  public id: any;

  constructor( 
    categoryService: CategoryService, 
    private productService: ProductService, 
    private route: ActivatedRoute 
    ) {
    this.categories$ = categoryService.getCategories();
    
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getOneProduct(this.id).subscribe( p => this.product = p );
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
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
    if ( this.id ) {
      this.productService.update(this.id, product);
      this.updateConfirm();
    } else {
      this.productService.create(product);
      this.saveConfirm();
    }
    f.reset();
  }

  //

  saveConfirm() {
    this.isSaved = true;
    setTimeout(() => {
      this.isSaved = false;
    }, 3000);
  }
  updateConfirm() {
    this.isUpdated = true;
    setTimeout(() => {
      this.isUpdated = false;
    }, 3000);
  }

}
