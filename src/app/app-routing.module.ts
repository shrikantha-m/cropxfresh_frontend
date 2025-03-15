import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'farmers',
    loadChildren: () => import('./features/farmers/farmers.module').then(m => m.FarmersModule)
  },
  { path: '', redirectTo: '/farmers/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
