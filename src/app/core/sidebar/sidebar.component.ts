import { Component, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';
import {SidebarModule} from 'primeng/sidebar';
import { Router,NavigationEnd } from '@angular/router';

//Importaciones para la navegacion entre componentes
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarModule,RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  visibleSidebar: boolean = true;
  menuItems: MenuItem[] = [];

  constructor(private router:Router){}

  ngOnInit(): void {
    this.menuItems = [
      {label:'Employees', icon:'pi pi-fw pi-users', routerLink: ['/Dashboard']},
    ]

    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        this.visibleSidebar = event.url !== '/login';
      }
    })
  }
}
