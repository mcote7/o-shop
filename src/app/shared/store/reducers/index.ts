import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromCategory from './category.reducer';
import * as fromProducts from './products.reducer';
export * from './router.reducer';

export interface ShoppingState {
  categories: fromCategory.CategoryState;
  products: fromProducts.ProductsState;
}

export const reducers: ActionReducerMap<ShoppingState> = {
  categories: fromCategory.reducer,
  products: fromProducts.reducer,
};

export const getShoppingState = createFeatureSelector<ShoppingState>('shopping');
