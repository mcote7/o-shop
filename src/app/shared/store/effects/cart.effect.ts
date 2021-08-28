import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
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
  ))
}