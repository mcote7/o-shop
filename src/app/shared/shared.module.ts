import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { AuthService } from "./services/auth.service";
import { AuthGuardService } from "./services/auth-guard.service";
import { CategoryService } from "./services/category.service";
import { OrderService } from "./services/order.service";
import { ProductService } from "./services/product.service";
import { ShoppingCartService } from "./services/shopping-cart.service";
import { UserService } from "./services/user.service";
import { NutritionService } from "./services/nutrition.service";
import { RecipeService } from "./services/recipe.service";

// to share with other mods 
import { FormsModule } from "@angular/forms";
import { CustomFormsModule } from "ng2-validation";

// ngrx 
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// register your reducers & effects 
import { reducers, effects } from "./store";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    HttpClientModule,
    StoreModule.forFeature('shopping', reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
    NutritionService,
    RecipeService,
  ],
  exports: [
    FormsModule,
    CustomFormsModule,
    HttpClientModule,
  ]
})
export class SharedModule {}
