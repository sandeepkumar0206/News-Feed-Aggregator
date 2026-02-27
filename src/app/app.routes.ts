import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:'signup',loadComponent: () => import('./Pages/Auth/signup/signup').then(m => m.Signup)}
];
