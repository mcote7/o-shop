import { createAction, props } from "@ngrx/store";

import { ShoppingCart } from "../../models/shopping-cart";


export const loadCart = createAction('[shopping] Load Cart');
export const LoadCartFail = createAction('[shopping] Load Cart Fail', props<{errorMessage: string}>());
export const loadCartSuccess = createAction('[shopping] Load Cart Success', props<{cart: ShoppingCart}>());
