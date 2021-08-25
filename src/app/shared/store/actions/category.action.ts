import { createAction, props } from "@ngrx/store";

import { Category } from "../../models/category";


export const loadCategories = createAction('[shopping] Load Categories');
export const LoadCategoriesFail = createAction('[shopping] Load Categories Fail', props<{errorMessage: string}>());
export const loadCategoriesSuccess = createAction('[shopping] Load Categories Success', props<{categories: Category[]}>());

