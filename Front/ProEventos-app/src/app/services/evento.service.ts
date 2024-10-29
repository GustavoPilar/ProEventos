import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, take } from 'rxjs';

import { Evento } from '../model/Evento';

@Injectable({
  providedIn: 'root'
})

export class EventoService {

  private path: string = 'http://localhost:5082/api/evento';
  
  constructor(private http : HttpClient) { }

  public getEventos(): Observable<Evento[]> {
    return this.http
      .get<Evento[]>(this.path)
      .pipe(take(3));
  }

  public getEventosByTema(tema: string): Observable<Evento[]> {
    return this.http
      .get<Evento[]>(`${this.path}/tema/${tema}`)
      .pipe(take(3));
  }

  public getEventoById(id: number): Observable<Evento> {
    return this.http
      .get<Evento>(`${this.path}/${id}`)
      .pipe(take(3));
  }

  public post(evento: Evento): Observable<Evento> {
    return this.http
      .post<Evento>(this.path, evento)
      .pipe(take(3));
  }

  public put(evento : Evento): Observable<Evento> {
    return this.http
      .put<Evento>(`${this.path}/${evento.id}`, evento)
      .pipe(take(3));
  }

  public deleteEvento(id : number): Observable<any> {
    return this.http
      .delete(`${this.path}/${id}`)
      .pipe(take(3));
  }

}
