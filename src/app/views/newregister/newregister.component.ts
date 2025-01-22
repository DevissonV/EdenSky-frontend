import { Component,Input } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { Router } from '@angular/router';
import { FloatLabel } from 'primeng/floatlabel';
import { map } from 'rxjs/operators';

import { PasswordModule } from 'primeng/password';
//importaciones para formularios reactivos
import { FormControl, FormGroup, ReactiveFormsModule, Validators,FormsModule, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-newregister',
  standalone: true,
  imports: [
    FormsModule,
    FloatLabel,
    ReactiveFormsModule,
    FormsModule,
    PasswordModule,
  ],
  templateUrl: './newregister.component.html',
  styleUrl: './newregister.component.css'
})
export class NewregisterComponent {
  tipoRegistro:any;

   //definimos el formulario reactivo
   FrmRegister = new FormGroup({
    /** Campos para el formulario del cliente */
    username: new FormControl('',Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    /** Fin campo formulario cliente */

    /** Campos formulario barbero */
    name: new FormControl('',Validators.required),
    hire_date: new FormControl('', Validators.required),
    salary: new FormControl('', Validators.required),
    /** fin campor formulario barbero */
    
  });
  //Fin definicion del formulario reactivo

  constructor(private dataService: DataService,
    public _Router: Router,
  ) {
    
  }

  ngOnInit(): void {
    this.dataService.dataActual.pipe(
      map(data => {
        this.tipoRegistro = data;
        this.updateFormFields(data);
      })
    ).subscribe();
  }

  updateFormFields(data: string){

  }

  newRegister(){
    console.log(this.FrmRegister.value);
  }

  salirBarbero(){
    localStorage.removeItem('tiporegistro');
    this._Router.navigate(['/login'])
  }
  salirCliente(){
    localStorage.removeItem('tiporegistro');
    this._Router.navigate(['/login'])
  }
}
