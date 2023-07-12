import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './public/components/master-page/header/header.component';
import { FooterComponent } from './public/components/master-page/footer/footer.component';
import { SideMenuComponent } from './public/components/master-page/side-menu/side-menu.component';
import { PathNotFoundComponent } from './public/components/errors/path-not-found/path-not-found.component';
import { ServerErrorComponent } from './public/components/errors/server-error/server-error.component';
import { SharedModule } from './public/components/shared/shared.module';
import { LogoIconComponent } from './public/components/shared/logo-icon/logo-icon.component';
import { HomeComponent } from './public/components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    PathNotFoundComponent,
    ServerErrorComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
