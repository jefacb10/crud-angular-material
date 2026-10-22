import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado, Municipio } from './dados-regiao.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadosRegiaoService {

  baseUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  constructor(private http: HttpClient) { }

  obterEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.baseUrl}/estados`);
  }

  obterMunicipiosPorEstado(siglaEstado: string): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${this.baseUrl}/estados/${siglaEstado}/municipios`);
  }


}
