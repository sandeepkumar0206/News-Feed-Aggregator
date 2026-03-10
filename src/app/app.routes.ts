import { Routes } from '@angular/router';
import { Signup } from './Pages/Auth/signup/signup';
import { Login } from './Pages/Auth/login/login';
import { Dashboard } from './Pages/dashboard/dashboard';
import { authGuard } from './Guard/guard-guard';

export const routes: Routes = [
  { path: '', component: Signup },
  { path: 'login', component: Login },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

]
