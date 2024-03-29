import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
// import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor( private db: AngularFireDatabase ) { }

  create(product: any) {
    return this.db.list('/products').push(product);
  }

  // used from store  
  getAll() {
    return this.db.list('/products').valueChanges(undefined, {idField: 'key'});
  }
  // 

  getOneProduct(productId: any) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId: any, product: any) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: any) {
    return this.db.object('/products/' + productId).remove();
  }

}
