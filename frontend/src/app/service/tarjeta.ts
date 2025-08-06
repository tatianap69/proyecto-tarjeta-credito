import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Tarjeta {
  private myApiUrl = `/api/Tarjeta/`;

  constructor(private http: HttpClient) {}
  getListadoTarjetas(): Observable<any> {
    return this.http.get(this.myApiUrl);
  }
}
