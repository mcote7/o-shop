import { Action } from "@ngrx/store";
import { createReducer, on } from "@ngrx/store";
import { Product } from "../../models/product";
import * as fromActions from '../actions';


export interface ProductsState {
  products: Product[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: ProductsState = {
  products: [],
  loaded: false,
  loading: false
};

const productsReducer = createReducer(
  initialState,

  on(
    fromActions.loadProducts, 
    state => ({ ...state, loaded: false, loading: true})),
  
  on(
    fromActions.LoadProductsFail, 
    (state, {errorMessage}) => ({ ...state, loaded: false, loading: false, errorMessage: errorMessage})),
  
  on(
    fromActions.loadProductsSuccess, 
    (state, {products}) => ({ ...state, loaded: true, loading: false, products: products})),
);

export function reducer(state: ProductsState | undefined, action: Action) {
  return productsReducer(state, action);
}; 

// composed slices of state
export const getAllProducts = (state: ProductsState) => state.products;
export const getProductsLoaded = (state: ProductsState) => state.loaded;
export const getProductsLoading = (state: ProductsState) => state.loading;
