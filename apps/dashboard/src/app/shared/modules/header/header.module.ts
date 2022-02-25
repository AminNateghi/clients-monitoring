import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxButtonModule, DxToolbarModule } from 'devextreme-angular';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    DxToolbarModule,
    DxButtonModule
  ],
  exports: [
    HeaderComponent,
  ],
})
export class HeaderModule { }

