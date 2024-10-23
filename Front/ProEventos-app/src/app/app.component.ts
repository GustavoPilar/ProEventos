import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { EventosComponent } from './components/eventos/eventos.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { PerfilComponent } from './components/perfil/perfil.component';

import { NgxSpinnerService, NgxSpinnerModule  } from "ngx-spinner";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    EventosComponent,
    PalestrantesComponent,
    NavbarComponent,
    DashboardComponent,
    ContatosComponent,
    PerfilComponent,

    CommonModule,
    NgxSpinnerModule,
  ],
  providers: [
    NgxSpinnerService,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProEventos-app';
}