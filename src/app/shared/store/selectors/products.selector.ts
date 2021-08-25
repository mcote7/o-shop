import { createSelector } from "@ngrx/store";
import * as fromFeature from '../reducers';
import * as fromProducts from '../reducers/products.reducer';


export const getProductsState = createSelector(fromFeature.getShoppingState, (state: fromFeature.ShoppingState) => state.products);

export const getAllProducts = createSelector(getProductsState, fromProducts.getAllProducts);

export const getProductsByCategory = createSelector(getAllProducts, () => {
  // use router store select
});

// TODO: add get by id &...

export const getProductsLoaded = createSelector(getProductsState, fromProducts.getProductsLoaded);
export const getProductsLoading = createSelector(getProductsState, fromProducts.getProductsLoading);
