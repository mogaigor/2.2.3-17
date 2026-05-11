import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.services';
import { PokemonDetail } from '../../models/pokemon.models';

@Component({
  selector: 'app-pokemon-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css'
})
export class PokemonDetailComponent {

  pokemon!: PokemonDetail;
  loading: boolean = false;
  o!: Observable<PokemonDetail>;

  // Dependency injection di ActivatedRoute e Location
  constructor(
    private route: ActivatedRoute,
    public service: PokemonService,
    private location: Location
  ) {
    this.route.paramMap.subscribe(this.getRouterParam);
  }

  // Riceve il parametro :id dall'url e carica i dettagli del pokemon
  getRouterParam = (params: ParamMap) => {
    let uri_param = params.get('id'); // Ottengo l'id dalla ParamMap
    console.log(uri_param);           // Stampo su console

    if (uri_param) {
      this.loading = true;
      this.o = this.service.getPokemonDetail(uri_param);
      this.o.subscribe(this.getData);
    }
  }

  // Riceve il dettaglio del pokemon dall'API
  getData = (data: PokemonDetail) => {
    this.pokemon = data;
    this.loading = false;
  }

  // Torna alla pagina precedente
  goBack(): void {
    this.location.back();
  }

  // Calcola la larghezza percentuale della barra della statistica (max 255)
  getStatPercent(value: number): number {
    return Math.round((value / 255) * 100);
  }

  // Colore della barra in base al valore della statistica
  getStatColor(value: number): string {
    if (value >= 100) return 'success';
    if (value >= 60) return 'warning';
    return 'danger';
  }
}