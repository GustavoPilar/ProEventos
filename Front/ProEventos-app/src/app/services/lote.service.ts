import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lote } from '@app/model/Lote';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoteService {
  private path: string = 'http://localhost:5082/api/evento';
  constructor(private http : HttpClient) { }

  public getLotesByEventoId(eventoId : number): Observable<Lote[]> {
    return this.http
    .get<Lote[]>(`${this.path}/${eventoId}`)
      .pipe(take(1));
  }

  public SaveLote(eventoId : number, lotes : Lote[]): Observable<Lote[]> {
    return this.http
      .put<Lote[]>(`${this.path}/${eventoId}`, lotes)
      .pipe(take(1));
  }

  public deleteEvento(eventoId : number, loteId : number): Observable<any> {
    return this.http
      .delete(`${this.path}/${eventoId}/${loteId}`)
      .pipe(take(1));
  }
}
