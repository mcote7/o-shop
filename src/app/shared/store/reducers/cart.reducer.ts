import { Action } from "@ngrx/store";
import { createReducer, on } from "@ngrx/store";
import { ShoppingCart } from "../../models/shopping-cart";

import * as fromActions from '../actions';

export interface CartState {
  cart: ShoppingCart;
  loaded: boolean;
  loading: boolean;
}

export const initialState = {
  cart: {items: []},
  loaded: false,
  loading: false,
};

const cartReducer = createReducer(
  initialState,
  
  on(
    fromActions.loadCart, 
    state => ({ ...state, loaded: false, loading: true })),
  
  on(
    fromActions.LoadCartFail, 
    (state, {errorMessage}) => ({ ...state, loaded: false, loading: false, errorMessage: errorMessage })),
  
  on(
    fromActions.loadCartSuccess, 
    (state, {cart}) => ({ ...state, loaded: true, loading: false, cart: cart })),
  
  // add to cart 
  on(
    fromActions.addToCart, 
    (state, {product}) => ({...state, product: product })),
  
  on(
    fromActions.addToCartFail, 
    (state, {errorMessage}) => ({ ...state, errorMessage: errorMessage })),
  
  on(
    fromActions.addToCartSuccess, 
    (state, {product}) => ({ ...state, product: product })),
  
  // remove from cart
  on(
    fromActions.removeFromCart, 
    (state, {product}) => ({...state, product: product })),
  
  on(
    fromActions.removeFromCartFail, 
    (state, {errorMessage}) => ({ ...state, errorMessage: errorMessage })),
  
  on(
    fromActions.removeFromCartSuccess, 
    (state, {product}) => ({ ...state, product: product })),
);

export function reducer(state: CartState | undefined, action: Action) {
  return cartReducer(state, action);
};

// composed slices of state
export const getCart = (state: CartState) => state.cart;
export const getCartLoaded = (state: CartState) => state.loaded;
export const getCartLoading = (state: CartState) => state.loading;
