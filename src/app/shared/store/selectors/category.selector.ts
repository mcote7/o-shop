import { createSelector } from "@ngrx/store";
import * as fromFeature from '../reducers';
import * as fromCategory from '../reducers/category.reducer';


export const getCategoriesState = createSelector(fromFeature.getShoppingState, (state: fromFeature.ShoppingState) => state.categories);

export const getAllCategories = createSelector(getCategoriesState, fromCategory.getAllCategories);


export const getCategoriesLoaded = createSelector(getCategoriesState, fromCategory.getCategoriesLoaded);
export const getCategoriesLoading = createSelector(getCategoriesState, fromCategory.getCategoriesLoading);
