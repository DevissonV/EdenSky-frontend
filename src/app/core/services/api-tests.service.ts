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
  private mensaje: string = "Hola desde el servicio de API";

  //Variable que contiene el llamado al Endpoint de TEST
  private urlTest: string;

  constructor(
    private http: HttpClient
  ) {
    this.urlTest = API.url
  }

  errorAPITest(): Observable<any>{
    return this.http.get(this.urlTest + 'test-response-error');
  }

  obtenerMensaje():  string{
    return this.mensaje
  }
}
