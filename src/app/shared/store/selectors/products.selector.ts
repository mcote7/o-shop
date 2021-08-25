import { createSelector } from "@ngrx/store";
import * as fromFeature from '../reducers';
import * as fromProducts from '../reducers/products.reducer';
import { ActivatedRoute } from '@angular/router';


export const getProductsState = createSelector(fromFeature.getShoppingState, (state: fromFeature.ShoppingState) => state.products);

export const getAllProducts = createSelector(getProductsState, fromProducts.getAllProducts);

export const getProductsByCategory = createSelector(getAllProducts, (products) => {
  ActivatedRoute.prototype.queryParamMap.subscribe(params => {
    let category = params.get('category');
    if(category) {
      return products.filter(p => p.category === category);
    } else {
      return products;
    }
  })
});

// TODO: add get by id &...

export const getProductsLoaded = createSelector(getProductsState, fromProducts.getProductsLoaded);
export const getProductsLoading = createSelector(getProductsState, fromProducts.getProductsLoading);
