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


  constructor(
    private http : HttpClient
  ) {
    this.url = API.url
  }

  loginService(Usuario:any):Observable<any>{
    
    let parametros = JSON.stringify(Usuario)
    let headers = new HttpHeaders({
      'Content-Type':'Application/json'
    })
    return this.http.post(this.url + 'users/login',parametros,{headers})
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
}
