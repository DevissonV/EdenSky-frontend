import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./views/login/login.component";
import { ComponentInlineComponent } from './views/component-inline/component-inline.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ComponentInlineComponent,SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Bienvenido a EdenSkyFront';
}
