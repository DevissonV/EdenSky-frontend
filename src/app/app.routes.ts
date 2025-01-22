import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { authGuard } from './core/guard/auth.guard';
import { NewregisterComponent } from './views/newregister/newregister.component';

export const routes: Routes = [
    {path: 'Dashboardbarber',title: 'Dashboard barberia',component: DashboardComponent},
    {path:'',title:'login',loadComponent: () => import('./views/login/login.component').then(c => c.LoginComponent)},
    {path:'login', loadComponent: () => import('./views/login/login.component').then(c => c.LoginComponent)},
    {path:'newRegister', loadComponent:() => import('./views/newregister/newregister.component').then(c => c.NewregisterComponent)},
    {path:'logout/:sure',loadComponent: () => import('./views/login/login.component').then(c => c.LoginComponent)}
];

