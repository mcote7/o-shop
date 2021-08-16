import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, concatMap, map, switchMap } from "rxjs/operators";
import * as fromServices from '../../services/category.service';
import * as fromActions from '../actions/category.action';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private categoryService: fromServices.CategoryService,
  ) {}

  loadCategoriesEffect$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.loadCategories),
    switchMap(() => this.categoryService.getCategories().pipe(
      map(cats => fromActions.loadCategoriesSuccess({categories: cats})),
      catchError(error => of(fromActions.LoadCategoriesFail({errorMessage: error})))
    ))
  ));

}
