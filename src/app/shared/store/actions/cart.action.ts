import { createAction, props } from "@ngrx/store";

import { Product } from "../../models/product";
import { ShoppingCart } from "../../models/shopping-cart";


export const loadCart = createAction('[shopping] Load Cart');
export const LoadCartFail = createAction('[shopping] Load Cart Fail', props<{errorMessage: string}>());
export const loadCartSuccess = createAction('[shopping] Load Cart Success', props<{cart: ShoppingCart}>());

export const addToCart = createAction('[shopping] Add to Cart', props<{product: Product}>());
export const addToCartFail = createAction('[shopping] Add to Cart Fail', props<{errorMessage: string}>());
export const addToCartSuccess = createAction('[shopping] Add to Cart Success', props<{product: Product}>());

export const removeFromCart = createAction('[shopping] Remove from Cart', props<{product: Product}>());
export const removeFromCartFail = createAction('[shopping] Remove from Cart Fail', props<{errorMessage: string}>());
export const removeFromCartSuccess = createAction('[shopping] Remove from Cart Success', props<{product: Product}>());
