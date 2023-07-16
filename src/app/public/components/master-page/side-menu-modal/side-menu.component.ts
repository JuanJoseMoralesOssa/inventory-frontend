import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-menu-modal',
  templateUrl: './side-menu-modal.component.html',
  styleUrls: ['./side-menu-modal.component.css']
})
export class SideMenuModalComponent {

  faClose = faClose;

  constructor(
    private dialogRef: DialogRef,
  ) {
  }

  close() {
    this.dialogRef.close();
  }
}
