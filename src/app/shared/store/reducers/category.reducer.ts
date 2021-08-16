import { Action } from "@ngrx/store";
import { createReducer, on } from "@ngrx/store";
import { Category } from "../../models/category";
import * as fromActions from '../actions';


export interface CategoryState {
  categories: Category[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: CategoryState = {
  categories: [],
  loaded: false,
  loading: false
};

const categoryReducer = createReducer(
  initialState,
  
  on(
    fromActions.loadCategories, 
    state => ({ ...state, loaded: false, loading: true})),
  
  on(
    fromActions.LoadCategoriesFail, 
    (state, {errorMessage}) => ({ ...state, loaded: false, loading: false, errorMessage: errorMessage})),
  
  on(
    fromActions.loadCategoriesSuccess, 
    (state, {categories}) => ({ ...state, loaded: true, loading: false, categories: categories})),
);

export function reducer(state: CategoryState | undefined, action: Action) {
  return categoryReducer(state, action);
};

// composed slices of state
export const getAllCategories = (state: CategoryState) => state.categories;
export const getCategoriesLoaded = (state: CategoryState) => state.loaded;
export const getCategoriesLoading = (state: CategoryState) => state.loading;
