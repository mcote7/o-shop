import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CustomFormsModule } from "ng2-validation";
import { SharedModule } from "../shared/shared.module";
import { ShoppingRoutingModule } from "./shopping-routing.module";

import { CheckOutComponent } from "./components/check-out/check-out.component";
import { MyOrdersComponent } from "./components/my-orders/my-orders.component";
import { OrderSuccessComponent } from "./components/order-success/order-success.component";
import { ProductsComponent } from "./components/products/products.component";
import { ShoppingCartSummaryComponent } from "./components/shopping-cart-summary/shopping-cart-summary.component";
import { ShoppingCartComponent } from "./components/shopping-cart/shopping-cart.component";


@NgModule({
  declarations: [
    CheckOutComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    ProductsComponent,
    ShoppingCartComponent,
    ShoppingCartSummaryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    SharedModule,
    ShoppingRoutingModule,
  ],
})
export class ShoppingModule {}