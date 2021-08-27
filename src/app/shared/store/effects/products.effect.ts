import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import * as fromServices from '../../services/product.service';
import * as fromActions from '../actions/products.action';


@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: fromServices.ProductService,
  ) {}

  loadProductsEffect$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.loadProducts),
    switchMap(() => this.productsService.getAll().pipe(
      map(prod => fromActions.loadProductsSuccess({products: prod})),
      catchError(error => of(fromActions.LoadProductsFail({errorMessage: error})))
    ))
  ));
}
