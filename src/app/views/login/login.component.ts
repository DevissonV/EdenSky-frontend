import { Component,OnInit } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';
import { DashboardComponent } from '../dashboard/dashboard.component';

//importaciones para formularios reactivos
import { FormControl, FormGroup, ReactiveFormsModule, Validators,FormsModule, FormBuilder } from '@angular/forms';

//Importaciones para la navegacion entre componentes
import { RouterLink,RouterOutlet } from '@angular/router';

import { FocusTrapModule } from 'primeng/focustrap';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AutoFocusModule } from 'primeng/autofocus';

//Importaciones para mostrar el Dialog al presionar un boton
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

//Llamamos los servicios de la API
import { ApiTestsService } from '../../core/services/api-tests.service';

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
providers:[ConfirmationService,MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  empleados: any[] = [];

  iniciarSesion = new FormGroup({
    usuario: new FormControl('',Validators.required),
    contrasena: new FormControl('', Validators.required),
  });

  // definimos el constructor para llamar la confirmacion y el mensaje
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private serviceApiTest: ApiTestsService
  ){}
  
  private titulo = 'titulo componente login';
  private getTituloII = 'Titulo obtenido desde el metodo regular get'

  ngOnInit(): void {
    this.serviceApiTest.errorAPITest().subscribe((data)=>{
      this.empleados = data;
      console.log(this.empleados)
    });
  }

  enviarFormulario(){

    console.log(this.iniciarSesion.value['usuario'])
    console.log(this.iniciarSesion.value['contrasena'])
  }

  //Metodo getter de typescript
  get mostrarTitulo(){
    return this.titulo;
  }

  getTitulo(){
    return this.getTituloII
  }

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
