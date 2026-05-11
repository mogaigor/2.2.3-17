import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { PokemonService } from '../../services/pokemon.services';
import { PokemonType, TypesResponse } from '../../models/pokemon.models';
import { CommonModule } from '@angular/common';

// Le 3 categorie selezionate da mostrare
const SELECTED_TYPES = ['fire', 'water', 'grass'];

@Component({
  selector: 'app-types',
  imports: [CommonModule, RouterModule],
  templateUrl: './types.html',
  styleUrl: './types.css'
})
export class TypesComponent {

  types: PokemonType[] = [];
  loading: boolean = false;
  o!: Observable<TypesResponse>;

  constructor(public service: PokemonService) {
    this.loading = true;
    this.o = this.service.getTypes();
    this.o.subscribe(this.getData);
  }

  // Riceve la risposta dell'API e filtra le 3 categorie desiderate
  getData = (response: TypesResponse) => {
    this.types = response.results.filter((t: PokemonType) => SELECTED_TYPES.includes(t.name));
    this.loading = false;
  }

  // Restituisce un'emoji in base al tipo
  getTypeEmoji(name: string): string {
    const map: Record<string, string> = {
      fire: '🔥',
      water: '💧',
      grass: '🌿'
    };
    return map[name] ?? '❓';
  }

  // Restituisce un colore Bootstrap in base al tipo
  getTypeColor(name: string): string {
    const map: Record<string, string> = {
      fire: 'danger',
      water: 'primary',
      grass: 'success'
    };
    return map[name] ?? 'secondary';
  }

  // Gestisce l'hover del mouse
  onMouseEnter(event: MouseEvent): void {
    (event.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
  }

  // Gestisce il mouseleave
  onMouseLeave(event: MouseEvent): void {
    (event.currentTarget as HTMLElement).style.transform = 'scale(1)';
  }
}