
// https://api.edamam.com/
// api/nutrition-data?app_id=457c1396&app_key=df29b42c10b99b78f454a3a7f4ae3cae&nutrition-type=logging&ingr=${{mango}}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NutritionService {
  constructor(private http: HttpClient) {}

  getNutritionFacts(item: string): Observable<any> {
    return this.http.get(`https://api.edamam.com/api/nutrition-data?app_id=457c1396&app_key=df29b42c10b99b78f454a3a7f4ae3cae&nutrition-type=logging&ingr=5oz.${item}`)
      .pipe(catchError((error: any) => error))
  }
}
