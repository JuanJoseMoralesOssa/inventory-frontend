import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ConfigSideMenu } from 'src/app/config/config.side.menu';

@Component({
  selector: 'app-side-menu-modal',
  templateUrl: './side-menu-modal.component.html',
  styleUrls: ['./side-menu-modal.component.css']
})
export class SideMenuModalComponent {

  faClose = faClose;
  options = ConfigSideMenu.listMenus;

  constructor(
    private dialogRef: DialogRef,
  ) {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
