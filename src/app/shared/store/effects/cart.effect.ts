import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import * as fromServices from '../../services/shopping-cart.service';
import * as fromActions from '../actions/cart.action';


@Injectable()
export class CartEffects {
  public cartId: string = localStorage.getItem('cartId');
  constructor(
    private actions$: Actions,
    private cartService: fromServices.ShoppingCartService,
  ) {}

  loadCartEffect$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.loadCart),
    switchMap(() => this.cartService.getCart(this.cartId).pipe(
      map(cart => fromActions.loadCartSuccess({cart: cart})),
      catchError(error => of(fromActions.LoadCartFail({errorMessage: error})))
    ))
  ));

  addToCartEffect$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.addToCart),
    tap((value) => {this.cartService.addToCart(value.product)}),
    map(prod => fromActions.addToCartSuccess(prod)),
    catchError(error => of(fromActions.addToCartFail({errorMessage: error})))
  ));

  removeFromCartEffect$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.removeFromCart),
    tap((value) => {this.cartService.removeFromCart(value.product)}),
    map(prod => fromActions.removeFromCartSuccess(prod)),
    catchError(error => of(fromActions.removeFromCartFail({errorMessage: error})))
  ));
}