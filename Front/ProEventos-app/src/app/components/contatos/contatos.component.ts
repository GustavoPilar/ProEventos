import { Component } from '@angular/core';
import { TitulosComponent } from '@app/shared/titulos/titulos.component';

@Component({
  selector: 'app-contatos',
  standalone: true,
  imports: [
    TitulosComponent,
  ],
  templateUrl: './contatos.component.html',
  styleUrl: './contatos.component.scss'
})
export class ContatosComponent {

}
