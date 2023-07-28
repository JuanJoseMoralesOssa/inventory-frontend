import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartIconComponent } from './cart-icon/cart-icon.component';
import { LogoIconComponent } from './logo-icon/logo-icon.component';
import { BtnComponent } from './btn/btn.component';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { FilterPipe } from './filter/filter-pipe.component';



@NgModule({
  declarations: [
    CartIconComponent,
    LogoIconComponent,
    BtnComponent,
    TodoDialogComponent,
    // FilterPipe,
  ],
  exports: [
    CartIconComponent,
    LogoIconComponent,
    BtnComponent,
    // FilterPipe
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ]
})
export class SharedModule { }
