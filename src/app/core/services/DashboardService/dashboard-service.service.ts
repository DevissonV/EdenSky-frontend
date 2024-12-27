import { Injectable } from '@angular/core';
import { API } from '../../Api/api.service';
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
    this.url = API.url
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
    console.log(token);
    /** le pasamos el tipo de cabecera que va utilizar para que pueda ser leida por el backend */
    //let headers = new HttpHeaders().set('Authorization','Bearer Token'+token);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization','Bearer '+token);

    //Retornamos el llamado al endpoint con sus parametros y cabeceras
    return this.http.get(this.url + 'employees/get-employees',{ headers: headers });
  }
}
