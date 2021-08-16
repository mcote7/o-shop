import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromCategory from './category.reducer';


export interface ShoppingState {
  categories: fromCategory.CategoryState;
}

export const reducers: ActionReducerMap<ShoppingState> = {
  categories: fromCategory.reducer,
};

export const getShoppingState = createFeatureSelector<ShoppingState>('shopping');
