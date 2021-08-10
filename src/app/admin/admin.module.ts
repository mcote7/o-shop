import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CustomFormsModule } from "ng2-validation";

import { SharedModule } from "../shared/shared.module";
import { AdminRoutingModule } from "./admin-routing.module";

import { AdminOrdersComponent } from "./components/admin-orders/admin-orders.component";
import { AdminProductsComponent } from "./components/admin-products/admin-products.component";
import { ProductFormComponent } from "./components/product-form/product-form.component";

import { AdminAuthGuardService } from "./services/admin-auth-guard.service";


@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    SharedModule,
    AdminRoutingModule,
  ],
  providers: [
    AdminAuthGuardService,
  ]
})
export class AdminModule {}
