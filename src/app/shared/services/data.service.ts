import { Injectable } from '@angular/core';

//Un BehaviorSubject es un tipo especial de Observable que mantiene el valor actual y lo emite a cualquier nuevo suscriptor.
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /**el BehaviorSubject es una clase de Rxjs que nos permite manejar
   * flujos de datos asincronos, es una variable de Subject que requiere un valor inicial
   * y siempre emite su valor actual a los nuevos suscriptores*/
  private dataSource = new BehaviorSubject<string>(this.getDataFromLocalStorage());

  /** Exponemos el BehaviorSubject como un Observable
   para que otros componentes se suscriban a el*/
  dataActual = this.dataSource.asObservable();

  constructor() { }

  // Este metodo actualiza el valor del BehaviorSubject
  actualizarData(data: string){
    this.dataSource.next(data);
    localStorage.setItem('tiporegistro', data);
  }

  /** este metodo nos sirve para almacenar la variable
   * TipoRegistro en el localStorage del navegador
   */
  private getDataFromLocalStorage():string{
    return localStorage.getItem('tiporegistro') || 'default';;
  }
}
