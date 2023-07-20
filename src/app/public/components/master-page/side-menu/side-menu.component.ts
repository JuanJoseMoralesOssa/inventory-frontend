import { Component } from '@angular/core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { ConfigSideMenu } from 'src/app/config/config.side.menu';
import { SharedSideNavInfoServiceService } from 'src/app/services/shared-side-nav-info-service.service';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  collapsed =  false;
  options = ConfigSideMenu.listMenus;
  fahouse = faHouse;

  constructor(
    private sharedSideNavInfoService: SharedSideNavInfoServiceService
  ) {

  }

  chooseOption(option: string) {
    // Al hacer clic en el botón del primer componente, se dispara la acción en el servicio.
    this.sharedSideNavInfoService.triggerAction(option);
  }
}
