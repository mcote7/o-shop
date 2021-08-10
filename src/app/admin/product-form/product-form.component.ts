import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';

import { toastNotification } from '../../../animations/anime';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  animations: [toastNotification]
})

export class ProductFormComponent implements OnInit, OnDestroy {

  public categories$: any;

  public capsIsOn = false;

  public isSaved = false;

  public isUpdated = false;

  public isDeleting = false;

  public product: any = {};

  public id: any;

  constructor( 
    categoryService: CategoryService, 
    private productService: ProductService, 
    private router: Router,
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
      this.productService.update(this.id, product).catch(err => {
        console.log("error", err)
        alert("🤚 🛑 🚫 🔒\nYou do not have permission\nto write or modify product data!\nChanges will not take effect. 😢")
      });
      this.updateConfirm();
    } else {
      this.productService.create(product).catch(err => {
        console.log("error", err)
        alert("🤚 🛑 🚫 🔒\nYou do not have permission\nto write or modify product data!\nChanges will not take effect. 😢")
      });
      this.saveConfirm();
      f.reset();
    }
  }

  deleteProduct() {
    if (confirm('🤔 Are you sure you want to delete? You will be re-directed to the products page upon deletion.')) {
      this.isDeleting = true;
      this.productService.delete(this.id).catch(err => {
        console.log("error", err)
        alert("🤚 🛑 🚫 🔒\nYou do not have permission\nto write or modify product data!\nChanges will not take effect. 😢")
      });
      this.router.navigate(['/admin/products']);
      alert(`✔ Product id # ${this.id} has been deleted.`);
    }
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
