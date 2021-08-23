
// https://api.edamam.com/
// api/recipes/v2?type=public&q=${{mango}}&app_id=840ddb17&app_key=a87b671f3cf3187d51e086ef777d24fe

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public previousPage: string;
  constructor(private http: HttpClient) {}

  getRecipes(item: string): Observable<any> {
    return this.http.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${item}&app_id=840ddb17&app_key=a87b671f3cf3187d51e086ef777d24fe`)
      .pipe(catchError((error: any) => error))
  }

  getNextRecipePage(href: string): Observable<any> {
    this.previousPage = href;
    return this.http.get(href)
      .pipe(catchError((error: any) => error))
  }

  getPreviousRecipePage(): Observable<any> {
    if(this.previousPage) {
      return this.http.get(this.previousPage)
        .pipe(catchError((error: any) => error))
    } else {
      console.log("no previous page?", this.previousPage)
      return;
    }
  }
}
