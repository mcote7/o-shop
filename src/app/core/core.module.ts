import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";

import { LoginComponent } from "./components/login/login.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ScrollProgressReadComponent } from "./components/scroll-progress-read/scroll-progress-read.component";
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent,
    ScrollProgressReadComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([]),
  ],
  exports: [
    NavbarComponent,
    ScrollProgressReadComponent,
  ],
})
export class CoreModule {}
