import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartIconComponent } from './cart-icon/cart-icon.component';
import { LogoIconComponent } from './logo-icon/logo-icon.component';
import { BtnComponent } from './btn/btn.component';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    CartIconComponent,
    LogoIconComponent,
    BtnComponent,
    TodoDialogComponent,
  ],
  exports: [
    CartIconComponent,
    LogoIconComponent,
    BtnComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ]
})
export class SharedModule { }
