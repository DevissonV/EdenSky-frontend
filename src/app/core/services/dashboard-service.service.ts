import { Injectable } from '@angular/core';
import { environmentDevelop } from '../../../environments/environment.development';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {
  //Variable que contiene el llamado al Endpoint del backend
  private url: string;
  public token: any;

  constructor(
    //le pasamos el modulo HttpClient para poder hacer peticiones http
    private http : HttpClient
  ) {
    //le pasamos la url del endpoint
    this.url = environmentDevelop.url
  }

  getToken() {
    let token = localStorage.getItem('token');
    if (token && token != 'undefined') {
      this.token = token
    } else {
      this.token = null
    }
    return this.token
  }

  getAllEmployee(token:any): Observable<any>{
    return this.http.get(this.url + 'employees/get-employees');
  }
}
