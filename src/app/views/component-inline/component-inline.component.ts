import { Component } from '@angular/core';

@Component({
  selector: 'app-component-inline',
  imports: [],
  template: `
    <ul [class]="listClasses">prueba listClasses</ul>
    <section [class]="sectionClasses">prueba section</section>
    <button [class]="buttonClasses" [style]="buttonStyles"> botones </button>

    <!-- Manejo eventos angular -->
     <button (click)="getConsole()"> click! </button>
  `,
  styles: `
    h1{
      color:red;
    }  
  `
})
export class ComponentInlineComponent {
  listClasses = 'full-width outlined';
  sectionClasses = ['expandable', 'elevated'];
  buttonClasses = {
    highlighted: true,
    embiggened: false,
  };
  buttonStyles = {
    border: '1px solid black',
    'font-weight': 'bold',
  };

  //Manejo eventos angular
  getConsole(){
    console.log('click en boton, funciona corretcamente'); 
  }
}
