import { Injectable } from '@angular/core';

//Un BehaviorSubject es un tipo especial de Observable que mantiene el valor actual y lo emite a cualquier nuevo suscriptor.
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data = new BehaviorSubject<string>('default');

  // Exponemos el BehaviorSubject como un Observable
  // para que otros componentes se suscriban a el
  dataActual = this.data.asObservable();

  constructor() { }

  // Este metodo actualiza el valor del BehaviorSubject
  actualizarData(data: string){
    this.data.next(data);
  }
}
