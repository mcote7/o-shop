import { Params } from '@angular/router';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';


export interface RouterStateUrl {
  url: string,
  queryParams: Params,
  params: Params
}

// the key: 'routerReducer' is needed by ngrx 
export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer
};


export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');