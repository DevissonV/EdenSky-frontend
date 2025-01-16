//Importaciones necesarias para el funcionamiento del componente
import { Component,input,OnInit } from '@angular/core';
import { Input, output } from '@angular/core';

//importamos el componente dashboard
import { DashboardComponent } from '../../../views/dashboard/dashboard.component';

import { jwtDecode } from 'jwt-decode';

//importaciones para la navegacion entre componentes
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

//importaciones para formularios reactivos
import { FormControl, FormGroup, ReactiveFormsModule, Validators,FormsModule, FormBuilder } from '@angular/forms';

//Importaciones para la navegacion entre componentes
import { RouterLink,RouterOutlet } from '@angular/router';

//importaciones para el uso de librerias de primeNG
import { FocusTrapModule } from 'primeng/focustrap';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AutoFocusModule } from 'primeng/autofocus';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';

//Llamamos los servicios de la API
import { LoginService } from '../../../core/services/LoginService/login.service';
import { NewregisterComponent } from "../newregister/newregister.component";
import { DataService } from '../../../core/services/shared/data.service';

//interface para decodificar el token y acceder a sus id, username y rol
interface DecodedToken {
  id: string;
  username: string;
  role: string;
}

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    InputTextModule,
    InputGroupAddonModule,
    InputGroupModule,
    FloatLabelModule,
    IconField,
    InputIcon,
    PasswordModule,
    IftaLabelModule,
    ButtonModule,
    DashboardComponent,
    ConfirmDialog, ToastModule,
    AutoFocusModule,
    FocusTrapModule, CheckboxModule, IconFieldModule, InputIconModule,
    ReactiveFormsModule,
    RouterLink, RouterOutlet,
    NewregisterComponent,
],
providers:[ConfirmationService,MessageService,LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  //variables
  public credencialesErroneas : any;
  public token:any;
  public role:any;
  public tipoRegistro:any;
  //fin variables

  //Prueba para comunicacion entre componentes
  //public Register = "prueba"
 // public register = input<Register>();
  // fin prueba componente


  //definimos el formulario reactivo
  ForminiciarSesion = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('', Validators.required),
  });
  //Fin definicion del formulario reactivo

  // definimos el constructor de la clase
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private loginService: LoginService,

    //llamamos el servicio de dataService que nos ayuda a actualizar
    //el tipo de dato que enviamos desde el registro de cliente o barbero
    private dataService: DataService,
    // fin llamado al servicio de dataService

    public _Router: Router,
    public _ActivadedRoute: ActivatedRoute
  ){}
  //fin definicion del constructor de la clase

  //metodo que se ejecuta al cargar el componente
  ngOnInit(): void {
    this.logout(); 
  }

  //metodo que se ejecuta al presionar el boton de iniciar sesion del formulario del login
  iniciarSesion(){
    this.loginService.setLoginUser(this.ForminiciarSesion.value).subscribe(
      res => {
        if (res.status == true) {
          this.token = res.data.token


          const decodeToeken = jwtDecode<DecodedToken>(this.token)

          // decodificamos el token, para acceder al usuario y el rol
          const userLogged = {
            id: decodeToeken.id,
            username: decodeToeken.username,
            role: decodeToeken.role
          }
          //fin decodificacion del token

          this.role = res.data.role
          localStorage.setItem('token',this.token)
          localStorage.setItem('role',this.role)
          localStorage.setItem('user',JSON.stringify(userLogged))
          this.loginService.setLoginUser(this.ForminiciarSesion.value,<any>true).subscribe(
            res => {
              this._Router.navigate(['/Dashboardbarber']);
            }
          )
        }
      },

      err => {
        this.credencialesErroneas = err.error.message
        alert(this.credencialesErroneas)
      }
    )
  }

  logout(){
    this._ActivadedRoute.params.subscribe(params => {
      let logout = +params['sure'];
      if (logout == 1) {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('user')

        this.token = '';

        this._Router.navigate(['/login'])
      } 
    })
  }

  //Metodo de pruebas para mostrar y configurar alertas al presionar un boton
  //Ejemplo de Guardar o Cancelar
  confirm1(event: Event){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Esta seguro que quieres iniciar sesion?',
      header: 'Confirmacion',
      closable:true,
      closeOnEscape:true,
      icon:'pi pi-exclamation-triangle',
      rejectButtonProps:{
        label:'Cancelar',
        severity:'secondary',
        outlined:true,
      },
      acceptButtonProps:{
        label:'Iniciar'
      },
      accept:()=>{
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: () => {
        this.messageService.add({
          severity:'error',
          summary:'Rechazado',
          detail: 'Detalle',
          life: 3000
        })
      }
    })
  }

  // Cuando presionamos uno de los botones 'Cliente' o 'Barbero' se ejecuta este metodo
  // y este metodo actualiza el BehaviorSubject con el valor del boton presionado
  newRegister(tipoRegistro:any){
    //Inyectamos el metodo de actualizarData para enviar el parametro del boton presionado
    // 'Cliente' o 'Barbero'
    this.dataService.actualizarData(tipoRegistro)
  }
}
