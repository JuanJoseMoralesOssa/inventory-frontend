import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DialogModule } from '@angular/cdk/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './public/components/master-page/header/header.component';
import { FooterComponent } from './public/components/master-page/footer/footer.component';
import { PathNotFoundComponent } from './public/components/errors/path-not-found/path-not-found.component';
import { ServerErrorComponent } from './public/components/errors/server-error/server-error.component';
import { SharedModule } from './public/components/shared/shared.module';
import { HomeComponent } from './public/components/home/home.component';
import { BoardsComponent } from './public/pages/boards/boards.component';
import { NavbarComponent } from './public/components/master-page/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExampleItemComponent } from './public/components/example-item/example-item.component';
import { ScrollComponent } from './public/pages/scroll/scroll.component';
import { TableComponent } from './public/pages/table/table.component';
import { SideMenuModalComponent } from './public/components/master-page/side-menu-modal/side-menu.component';
import { SideMenuComponent } from './public/components/master-page/side-menu/side-menu.component';
import { DashboardComponent } from './public/pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideMenuModalComponent,
    PathNotFoundComponent,
    ServerErrorComponent,
    HomeComponent,
    BoardsComponent,
    NavbarComponent,
    ExampleItemComponent,
    ScrollComponent,
    TableComponent,
    SideMenuComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    OverlayModule,
    AppRoutingModule,
    SharedModule,
    FontAwesomeModule,
    CdkAccordionModule,
    DialogModule,
    HttpClientModule,
    ScrollingModule,
    CdkTableModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
