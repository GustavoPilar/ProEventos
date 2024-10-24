import { Component, OnInit } from '@angular/core';
import { TitulosComponent } from '@app/shared/titulos/titulos.component';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    TitulosComponent,

    RouterModule,
  ],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss'
})
export class EventosComponent implements OnInit {

  ngOnInit(): void {
    
  }
  
}
