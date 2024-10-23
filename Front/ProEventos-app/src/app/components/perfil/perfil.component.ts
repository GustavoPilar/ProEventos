import { Component } from '@angular/core';
import { TitulosComponent } from '../../shared/titulos/titulos.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    TitulosComponent,
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {

}
