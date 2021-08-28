import { createSelector } from "@ngrx/store";
import * as fromFeature from '../reducers';
import * as fromCart from '../reducers/cart.reducer';


export const getCartState = createSelector(fromFeature.getShoppingState, (state: fromFeature.ShoppingState) => state.cart);

export const getCart = createSelector(getCartState, fromCart.getCart);

export const getCartLoaded = createSelector(getCartState, fromCart.getCartLoaded);
export const getCartLoading = createSelector(getCartState, fromCart.getCartLoading);