import { createSelector } from "@ngrx/store";
import * as fromFeature from '../reducers';
import * as fromCart from '../reducers/cart.reducer';


export const getCartState = createSelector(fromFeature.getShoppingState, (state: fromFeature.ShoppingState) => state.cart);

export const getCart = createSelector(getCartState, fromCart.getCart);

export const getProductCartQuantity = ({product}) => createSelector(getCart, (cart) => {
  if(cart && cart.items) {
    let item = cart.items[product];
    return item ? item.quantity : 0;
  } else {
    return 0;
  }
});

export const getTotalCartQuantity = createSelector(getCart, (cart) => {
  if(cart && cart.items) {
    let count = 0;
    for(let productId in cart.items) {
      count += cart.items[productId].quantity;
    }
    return count;
  } else {
    return 0;
  }
});

export const getTotalCartprice = createSelector(getCart, (cart) => {
  if(cart && cart.items) {
    let total = 0;
    for(let productId in cart.items) {
      total += cart.items[productId].product.price * cart.items[productId].quantity;
    }
    return total;
  } else {
    return 0;
  }
});

export const getCartItemKeys = createSelector(getCart, (cart) => {
  if(cart && cart.items) {
    return Object.keys(cart.items);
  } else {
    return [];
  }
});

export const getCartLoaded = createSelector(getCartState, fromCart.getCartLoaded);
export const getCartLoading = createSelector(getCartState, fromCart.getCartLoading);
