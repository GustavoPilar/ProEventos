import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms'

import { CollapseDirective } from 'ngx-bootstrap/collapse';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    CommonModule,
    CollapseDirective,
    FormsModule,
  ],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss'
})
export class EventosComponent implements OnInit {
  
  private path: string = 'http://localhost:5082/api/evento';
  public eventos: any = [];
  public eventosFiltrados: any = [];
  imageWidth: number = 100;
  showImg: boolean = false;
  classEye: string = 'fa-solid fa-eye-slash';
  private _filterList: string = '';

  constructor(private http: HttpClient) { }

  public get getfilterList() : string {
    return this._filterList;
  }

  public set setFilterList(value : string) {
    this._filterList = value;
    this.eventosFiltrados = this._filterList ? this.filterEvents(this._filterList) : this.eventos;
  }

  filterEvents(value : string): any {
    value = value.toLowerCase();
    return this.eventos.filter(
      (e: { tema: string; local: string}) => e.tema.toLocaleLowerCase().indexOf(value) !== -1 ||
      e.local.toLocaleLowerCase().indexOf(value) !== -1
    )
  }

  ngOnInit(): void {
      this.getEventos();
  }

  public alterImg() {
    this.showImg = !this.showImg;
    this.classEye = this.showImg ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash';
  }

  public getEventos(): void {
      this.http.get(this.path).subscribe(
        {
          next: (response) => {
            this.eventos = response
            this.eventosFiltrados = this.eventos; 
          },
          error: (error) => console.log(error),
          complete: () => {}
        }
      )
  }

}
