import { Component } from '@angular/core';

import { DashboardServiceService } from '../../core/Services/DashboardService/dashboard-service.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  providers:[DashboardServiceService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public token:any;
  public listAllEmployee:any;

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
        console.log(response);
        if (response.code == 200) {
          alert("Se obtuvieron los datos correctamente");
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }
}
