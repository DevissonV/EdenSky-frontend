import { Component,Input } from '@angular/core';
import { DataService } from '../../../core/services/shared/data.service';

@Component({
  selector: 'app-newregister',
  imports: [],
  templateUrl: './newregister.component.html',
  styleUrl: './newregister.component.css'
})
export class NewregisterComponent {
  tipoRegistro:any;

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    this.dataService.dataActual.subscribe(data => {
      this.tipoRegistro = data;
    });
  }

}
