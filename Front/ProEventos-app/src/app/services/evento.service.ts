import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, take } from 'rxjs';

import { Evento } from '../model/Evento';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EventoService {

  private path: string = environment.apiUrl + 'api/evento/';
  
  constructor(private http : HttpClient) { }

  public getEventos(): Observable<Evento[]> {
    return this.http
      .get<Evento[]>(this.path)
      .pipe(take(1));
  }

  public getEventosByTema(tema: string): Observable<Evento[]> {
    return this.http
      .get<Evento[]>(`${this.path}tema/${tema}`)
      .pipe(take(1));
  }

  public getEventoById(id: number): Observable<Evento> {
    return this.http
      .get<Evento>(`${this.path}${id}`)
      .pipe(take(1));
  }

  public post(evento: Evento): Observable<Evento> {
    return this.http
      .post<Evento>(this.path, evento)
      .pipe(take(1));
  }

  public put(evento : Evento): Observable<Evento> {
    return this.http
      .put<Evento>(`${this.path}${evento.id}`, evento)
      .pipe(take(1));
  }

  public deleteEvento(id : number): Observable<any> {
    return this.http
      .delete(`${this.path}${id}`)
      .pipe(take(1));
  }

  postUpload(eventoId: number, file: File): Observable<Evento> {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http
    .post<Evento>(`${this.path}upload-image/${eventoId}`, formData)
    .pipe(take(1));
  }
}
