import { Component } from '@angular/core';

@Component({
  selector: 'app-titulos',
  standalone: true,
  imports: [],
  templateUrl: './titulos.component.html',
  styleUrl: './titulos.component.scss'
})
export class TitulosComponent {

  public titulo: string = '';

  public showTitle(titulo : string): void {
    this.titulo = titulo;
  }
}
