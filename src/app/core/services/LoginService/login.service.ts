import { Injectable } from '@angular/core';
import { API } from '../../Api/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

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

  setLoginUser(usuario:any, gettoken=null):Observable<any>{
    //comprobamos que el token no venga nulo
    if (gettoken != null) {
      usuario.gettoken = 'true';
      
    }

    //Convertimos los datos que vienen del formulario en un json
    let parametros = JSON.stringify(usuario)

    //le pasamos las cabeceras 
    let headers = new HttpHeaders({
      'Content-Type':'Application/json'
    })

    //Retornamos el llamado al endpoint con sus parametros y cabeceras
    return this.http.post(this.url + 'users/login',parametros,{headers})
  }

  getToken(){
    let token = localStorage.getItem('token');

    if (token && token != undefined) {
      this.token = token;
    }else{
      this.token = null; 
    }

    return this.token; 
  }
}
