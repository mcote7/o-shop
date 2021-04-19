import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { take } from 'rxjs/operators';
import { ShoppingCart } from 'src/models/shopping-cart';

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
    return this.db.object<ShoppingCart>('/shopping-carts/' + cartId).valueChanges();
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
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItem(cartId, product.key);
    items$.valueChanges().pipe(take(1)).subscribe((item: Product) => {
      if(item !== null) {
        console.log("hey not null", item)
        items$.update({ quantity: item.quantity + change});
      } else {
        items$.set({ product: product, quantity: change });
        console.log("hey null", item)
      }
    });
  }
}
