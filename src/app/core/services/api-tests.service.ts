import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../Api/api.service';

@Injectable({
  //ProvidedIn: Significa que este servicio es un servicio singleton
  //Singleton: Es un patron de diseño que nos permite tener 1 sola instancia de esta clase
  //en toda nuestra aplicaciones, esto quiere decir que solamente vamos a Tener
  //Una clase de ApiTestsService que se va compartir con toda nuestra aplicacion
  providedIn: 'root'
})
export class ApiTestsService {

  //Variable que contiene el llamado al Endpoint del backend
  private url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = API.url
  }

  errorAPITest(): Observable<any>{
    return this.http.get(this.url + 'health-checks/test-response-error');
  }




}
