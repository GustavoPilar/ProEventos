import { Component } from '@angular/core';
import { TitulosComponent } from '../../shared/titulos/titulos.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TitulosComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
