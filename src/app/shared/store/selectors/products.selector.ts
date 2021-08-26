import { createSelector } from "@ngrx/store";
import * as fromFeature from '../reducers';
import * as fromProducts from '../reducers/products.reducer';


export const getProductsState = createSelector(fromFeature.getShoppingState, (state: fromFeature.ShoppingState) => state.products);

export const getAllProducts = createSelector(getProductsState, fromProducts.getAllProducts);

export const getProductsByCategory = ({category}) => createSelector(getAllProducts, (prod) => {
  if(category) {
    return prod.filter(p => {
      return p.category === category;
    })
  } else {
    return prod;
  }
});

// TODO: add get by id &...

export const getProductsLoaded = createSelector(getProductsState, fromProducts.getProductsLoaded);
export const getProductsLoading = createSelector(getProductsState, fromProducts.getProductsLoading);
