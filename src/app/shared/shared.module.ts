import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthService } from "./services/auth.service";
import { AuthGuardService } from "./services/auth-guard.service";
import { CategoryService } from "./services/category.service";
import { OrderService } from "./services/order.service";
import { ProductService } from "./services/product.service";
import { ShoppingCartService } from "./services/shopping-cart.service";
import { UserService } from "./services/user.service";


@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
  ],
})
export class SharedModule {}
