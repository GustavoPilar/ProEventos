import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titulos',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './titulos.component.html',
  styleUrl: './titulos.component.scss'
})
export class TitulosComponent implements OnInit {
  
  @Input({
    alias: 'titulo',
    required: true,
  }) titulo = '';

  @Input({
    alias: 'subtitulo',
    required: false,
  }) subtitulo = 'Desde 2021';

  @Input({
    alias: 'iconClass',
    required: false
  }) iconClass = 'fa fa-user';

  @Input({}) botaoListar = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  listar(): void {
      this.router.navigate([`/${this.titulo.toLocaleLowerCase()}/lista`]);
  }
  
}
