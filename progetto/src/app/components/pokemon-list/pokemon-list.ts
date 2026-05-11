import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.services';
import { PokemonEntry, TypeDetailResponse } from '../../models/pokemon.models';

@Component({
  selector: 'app-pokemon-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css'
})
export class PokemonListComponent {

  typeName: string = '';
  pokemonList: PokemonEntry[] = [];
  loading: boolean = false;
  o!: Observable<TypeDetailResponse>;

  // Dependency injection di ActivatedRoute per leggere i parametri URL
  constructor(private route: ActivatedRoute, public service: PokemonService) {
    // Observable paramMap: si attiva ogni volta che il parametro dell'url cambia
    this.route.paramMap.subscribe(this.getRouterParam);
  }

  // Riceve il parametro :type dall'url e fa la chiamata HTTP
  getRouterParam = (params: ParamMap) => {
    let uri_param = params.get('type'); // Ottengo il tipo dalla ParamMap
    console.log(uri_param);             // Stampo su console

    if (uri_param) {
      this.typeName = uri_param;
      this.loading = true;
      this.o = this.service.getPokemonByType(uri_param);
      this.o.subscribe(this.getData);
    }
  }

  // Riceve la risposta e estrae i nomi dei pokemon
  getData = (response: TypeDetailResponse) => {
    // Ogni elemento è { pokemon: { name, url } }, estraiamo il campo pokemon
    this.pokemonList = response.pokemon.map((p: any) => p.pokemon).slice(0, 30);
    this.loading = false;
  }

  // Estrae l'id dal url del pokemon (es: .../pokemon/4/ → "4")
  getPokemonId(url: string): string {
    const parts = url.split('/').filter(p => p !== '');
    return parts[parts.length - 1];
  }
}