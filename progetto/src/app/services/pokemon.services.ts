import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  TypesResponse,
  TypeDetailResponse,
  PokemonDetail
} from '../models/pokemon.models';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(public http: HttpClient) {}

  // Ottiene tutti i tipi di pokemon
  getTypes(): Observable<TypesResponse> {
    let o: Observable<TypesResponse>;
    o = this.http.get<TypesResponse>(`${this.baseUrl}/type`);
    return o;
  }

  // Ottiene i pokemon di un tipo specifico
  getPokemonByType(typeName: string): Observable<TypeDetailResponse> {
    let o: Observable<TypeDetailResponse>;
    o = this.http.get<TypeDetailResponse>(`${this.baseUrl}/type/${typeName}`);
    return o;
  }

  // Ottiene i dettagli di un pokemon tramite id o nome
  getPokemonDetail(id: string): Observable<PokemonDetail> {
    let o: Observable<PokemonDetail>;
    o = this.http.get<PokemonDetail>(`${this.baseUrl}/pokemon/${id}`);
    return o;
  }
}