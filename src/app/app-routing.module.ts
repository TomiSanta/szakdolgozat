import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/services/auth.guard';

//Lazy loading
const routes: Routes = [
  { path: 'main',
  loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
  canActivate: [authGuard]
  },

  { path: 'men',
  loadChildren: () => import('./pages/men/men.module').then(m => m.MenModule),
  canActivate: [authGuard]
  },
  
  { path: 'not-found', 
  loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) 
  },

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  { path: 'login', 
  loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },

  { path: 'signup', 
  loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule) },

  //Wild card-os megoldas ide akarmit ha beir akkor a not found oldalra fogja iranyitani
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
