import { Component, OnInit } from '@angular/core';
import { TitulosComponent } from '../../shared/titulos/titulos.component';

@Component({
  selector: 'app-palestrantes',
  standalone: true,
  imports: [
    TitulosComponent,
  ],
  templateUrl: './palestrantes.component.html',
  styleUrl: './palestrantes.component.scss'
})
export class PalestrantesComponent implements OnInit{
  
  public titulo: string = 'Palestrantes';

  ngOnInit(): void {

  }
}
