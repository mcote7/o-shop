import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { take } from 'rxjs/operators';

import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  getCart(cartId: string) {
    // let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges();
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if(!cartId) {
      let result = await this.create()
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
    return cartId;
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItem(cartId, product.key);
    items$.valueChanges().pipe(take(1)).subscribe((item: Product) => {
      if(item !== null) {
        console.log("hey not null", item)
        items$.update({ quantity: item.quantity + 1});
      } else {
        items$.set({ product: product, quantity: 1 });
        console.log("hey null", item)
      }
    });
  }

  async removeFromCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItem(cartId, product.key);
    items$.valueChanges().pipe(take(1)).subscribe((item: Product) => {
      if(item !== null) {
        console.log("hey not null", item)
        items$.update({ quantity: item.quantity - 1});
      } else {
        // items$.set({ product: product, quantity: 1 });
        console.log("hey null", item)
      }
    });
  }

  private async updateItemQuantity(product: Product, change: number) {
    //
  }
}
