import { Component } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '../shared/todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-example-item',
  templateUrl: './example-item.component.html',
  styleUrls: ['./example-item.component.css']
})
export class ExampleItemComponent {

  todoId = 'Hola';

  constructor(
    private dialog: Dialog,
  ) {

  }

  openDialog(todoId: string) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        todoId: todoId,
      }
    });
    dialogRef.closed.subscribe(output => {
      console.log('====================================');
      console.log(output);
      console.log('====================================');
    });
  }

}
