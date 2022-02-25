import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DxChartModule } from 'devextreme-angular';
import { ClientsService } from '../../shared/services/clients.service';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DxChartModule
  ],
  providers: [
    ClientsService
  ]
})
export class HomeModule { }
