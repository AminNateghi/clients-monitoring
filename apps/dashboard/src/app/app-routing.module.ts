import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './shared/modules/layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'home',
    component: MainLayoutComponent,
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
  },

  // default page
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // if url dose not exist redirect to 404 page
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
