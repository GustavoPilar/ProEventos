import { Component } from '@angular/core';

import { EventosComponent } from './eventos/eventos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EventosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'ProEventos-app';
}
