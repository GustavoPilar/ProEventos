import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    CollapseModule,
    BsDropdownModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isCollapsed = true;
}
