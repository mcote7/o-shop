import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from  '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ScrollProgressReadComponent } from './scroll-progress-read/scroll-progress-read.component';

import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { UserService } from './shared/services/user.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { CategoryService } from './shared/services/category.service';
import { ProductService } from './shared/services/product.service';
import { ShoppingCartService } from './shared/services/shopping-cart.service';
import { OrderService } from './shared/services/order.service';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    LoginComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    ScrollProgressReadComponent,
    ShoppingCartSummaryComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    CustomFormsModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AdminAuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
