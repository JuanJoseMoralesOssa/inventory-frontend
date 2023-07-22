import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigSideMenu } from 'src/app/config/config.side.menu';
import { SharedSideNavInfoServiceService } from 'src/app/services/shared-side-nav-info-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy{

  @ViewChild('details', { read: ViewContainerRef }) details!: ViewContainerRef;
  private subscription: Subscription;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private sharedSideNavInfoService: SharedSideNavInfoServiceService
  ) {
    this.subscription = this.sharedSideNavInfoService.action$.subscribe(option => {
      this.showDetailsBasedOnConfig(option);
    });
  }

  showDetailsBasedOnConfig(option: string) {
    this.details.clear();
    const selectedOption = ConfigSideMenu.listMenus.find(item => item.text.toLowerCase() === option.toLowerCase());
    if (selectedOption) {
      selectedOption.component().then(componentInstance => {
        this.loadComponent(componentInstance)
      });
    }
  }

  loadComponent(componentInstance: any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentInstance);
    this.details.createComponent(componentFactory);
  }

  // onButtonClicked() {
  //   // Al hacer clic en el botón del segundo componente, se dispara la acción en el servicio.
  //   this.sharedSideNavInfoService.triggerAction();
  // }

  chooseSideNavOption() {
    // Coloca aquí la lógica que se debe ejecutar en el segundo componente
    // cuando recibe la acción del primer componente.
    console.log('Action from First Component received in Second Component!');
    this.showDetailsBasedOnConfig('Productos');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showDetails() {
    // this.details.clear();
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory();
    // this.details.createComponent(componentFactory);
  }

}
