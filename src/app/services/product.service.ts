import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor( private db: AngularFireDatabase ) { }

  create(product: any) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products').valueChanges(undefined, {idField: 'key'});
  }

  getOneProduct(productId: any) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId: any, product: any) {
    return this.db.object('/products/' + productId).update(product);
  }

  // not working 
  // getKey() {
  //   return this.db.list('/products').snapshotChanges();
  // }

}
