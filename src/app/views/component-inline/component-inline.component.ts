import { Component } from '@angular/core';

@Component({
  selector: 'app-component-inline',
  imports: [],
  template: `
    <h1>{{TituloComponenteInline}}</h1>
  `,
  styles: `
    h1{
      color:red;
    }  
  `
})
export class ComponentInlineComponent {
  TituloComponenteInline = 'Componente Inline'
}
