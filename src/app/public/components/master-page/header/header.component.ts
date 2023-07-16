import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { faBell, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { SideMenuModalComponent } from '../side-menu-modal/side-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  isOpen = false;
  isOpenBody = false;

  constructor(
    private dialog: Dialog,
  ) { }

  openDialog() {
    const dialogRef = this.dialog.open(SideMenuModalComponent, {
      minWidth: '270px',
      maxWidth: '40%',
      data: {
      }
    });
    dialogRef.closed.subscribe(output => {
      console.log('====================================');
      console.log(output);
      console.log('====================================');
    });
  }
}
