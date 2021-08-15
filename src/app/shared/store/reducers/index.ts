// import { ActionReducerMap } from '@ngrx/store';
import * as fromCategory from './category.reducer';


export interface ShoppingState {
  categories: fromCategory.CategoryState;
}

// export const reducers: ActionReducerMap<ShoppingState> = {

// }
