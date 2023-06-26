import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenComponent } from './men.component';

const routes: Routes = [
  { path: '', component: MenComponent },
  { path: 'successful', loadChildren: () => import('./successful/successful.module').then(m => m.SuccessfulModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenRoutingModule { }
