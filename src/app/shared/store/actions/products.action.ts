import { createAction, props } from "@ngrx/store";

import { Product } from "../../models/product";


export const loadProducts = createAction('[shopping] Load Products');
export const LoadProductsFail = createAction('[shopping] Load Products Fail', props<{errorMessage: string}>());
export const loadProductsSuccess = createAction('[shopping] Load Products Success', props<{products: Product[]}>());

