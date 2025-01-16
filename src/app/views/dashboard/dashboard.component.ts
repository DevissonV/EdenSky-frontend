import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardServiceService } from '../../core/services/DashboardService/dashboard-service.service';

import { ActivatedRoute, Router } from '@angular/router';

//importaciones de primeNG
import { TableModule } from 'primeng/table';

interface listEmployee {
  name: string;
  salary: any;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    TableModule
    ,CommonModule
  ],
  providers:[DashboardServiceService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public token:any;
  public listAllEmployee:any;
  public cols: any; 

  constructor(
    private dashboardService: DashboardServiceService,
    public _ActivatedRouter: ActivatedRoute,
    public _Router: Router
  ){
    this.token = this.dashboardService.getToken();
  }

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee(){
    this.dashboardService.getAllEmployee(this.token).subscribe(
      response => {
        if (response.code == 200) {
          this.listAllEmployee = response.data
          this.cols =[
            { field: 'name', header: 'Nombre' },
            { field: 'salary', header: 'Salario' }
          ]
        }
      },
      error => {
        alert("El token ha expirado");
      }
    )
  }
}
