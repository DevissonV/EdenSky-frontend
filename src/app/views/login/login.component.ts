//Importaciones necesarias para el funcionamiento del componente
import { Component,OnInit } from '@angular/core';

//importamos el componente dashboard
import { DashboardComponent } from '../dashboard/dashboard.component';

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
import { ApiTestsService } from '../../core/Services/api-tests.service';
import { LoginService } from '../../core/Services/LoginService/login.service';

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
    ConfirmDialog,ToastModule,
    AutoFocusModule,
    FocusTrapModule,CheckboxModule,IconFieldModule,InputIconModule
    ,ReactiveFormsModule
    ,RouterLink,RouterOutlet
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
  //fin variables

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
    private serviceApiTest: ApiTestsService,
    private loginService: LoginService,
    public _Router: Router,
    public _ActivadedRoute: ActivatedRoute
  ){}
  //fin definicion del constructor de la clase

  //metodo que se ejecuta al cargar el componente
  ngOnInit(): void {
  }

  //metodo que se ejecuta al presionar el boton de iniciar sesion del formulario del login
  iniciarSesion(){
    this.loginService.setLoginUser(this.ForminiciarSesion.value).subscribe(
      res => {
        if (res.status == true) {
          this.token = res.data.token
          this.role = res.data.role
          localStorage.setItem('token',this.token)
          localStorage.setItem('role',this.role)
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
}
