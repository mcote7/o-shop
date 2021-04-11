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
    return this.db.list('/products').valueChanges();
  }

  getKey() {
    return this.db.list('/products').snapshotChanges();
  }

}
