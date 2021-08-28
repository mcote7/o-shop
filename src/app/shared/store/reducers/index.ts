import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromCategory from './category.reducer';
import * as fromProducts from './products.reducer';
import * as fromCart from './cart.reducer';
export * from './router.reducer';

export interface ShoppingState {
  categories: fromCategory.CategoryState;
  products: fromProducts.ProductsState;
  cart: fromCart.CartState;
}

export const reducers: ActionReducerMap<ShoppingState> = {
  categories: fromCategory.reducer,
  products: fromProducts.reducer,
  cart: fromCart.reducer,
};

export const getShoppingState = createFeatureSelector<ShoppingState>('shopping');
