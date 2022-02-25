import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/modules/layouts/main-layout/main-layout.component';
import { EmptyLayoutComponent } from './shared/modules/layouts/empty-layout/empty-layout.component';
import { FooterComponent } from './shared/modules/footer/footer.component';
import { HeaderModule } from './shared/modules/header/header.module';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    EmptyLayoutComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HeaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
