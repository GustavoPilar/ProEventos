import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titulos',
  standalone: true,
  imports: [
    
  ],
  templateUrl: './titulos.component.html',
  styleUrl: './titulos.component.scss'
})
export class TitulosComponent implements OnInit {
  
  @Input ({
    alias: 'titulo',
    required: true,
    transform: (value: string) => value.toUpperCase()
  }) titulo!: string;

  constructor() { }

  ngOnInit(): void {
    
  }

  
}
