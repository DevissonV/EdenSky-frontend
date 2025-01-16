import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { authGuard } from './core/guard/auth.guard';
import { NewregisterComponent } from './auth/components/newregister/newregister.component';

export const routes: Routes = [
    {path: 'Dashboardbarber',title: 'Dashboard barberia',component: DashboardComponent},
    {path:'',title:'login',loadComponent: () => import('./auth/components/login/login.component').then(c => c.LoginComponent)},
    {path:'login', loadComponent: () => import('./auth/components/login/login.component').then(c => c.LoginComponent)},
    {path:'newRegister',component: NewregisterComponent},
    {path:'logout/:sure',loadComponent: () => import('./auth/components/login/login.component').then(c => c.LoginComponent)}
];

