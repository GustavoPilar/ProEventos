import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Evento } from '../model/Evento';

@Injectable({
  providedIn: 'root'
})

export class EventoService {

  private path: string = 'http://localhost:5082/api/evento';
  constructor(private http : HttpClient) { }

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.path);
  }

  getEventosByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.path}/tema/${tema}`);
  }
  getEventoById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.path}/${id}`);
  }
}
