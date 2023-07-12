import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartIconComponent } from './cart-icon/cart-icon.component';
import { LogoIconComponent } from './logo-icon/logo-icon.component';



@NgModule({
  declarations: [
    CartIconComponent,
    LogoIconComponent
  ],
  exports: [
    CartIconComponent,
    LogoIconComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
