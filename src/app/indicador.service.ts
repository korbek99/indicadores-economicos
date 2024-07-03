import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndicadorService {

  private apiUrl = 'https://mindicador.cl/api';
  private apiUrlIndi = 'https://mindicador.cl/api/';

  constructor(private http: HttpClient) { }

  getIndicadores(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getIndicadoresSolo(codigo: string): Observable<any> {
    return this.http.get<any>(this.apiUrlIndi + codigo);
  }
}
