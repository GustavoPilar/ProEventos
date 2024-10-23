import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,

    CommonModule,
    NgxSpinnerModule,
    RouterModule
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