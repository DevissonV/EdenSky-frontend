import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

export const routes: Routes = [
    {path: 'Dashboardbarber',title: 'Dashboard barberia',component: DashboardComponent},
    {path:'',title:'login',component: LoginComponent}
];

