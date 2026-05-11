import { Routes } from '@angular/router';
import { TypesComponent } from './components/types/types';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail';


export const routes: Routes = [
  // Redirect alla pagina dei tipi quando l'url è vuoto
  { path: '', redirectTo: '/types', pathMatch: 'full' },
  // Lista delle categorie (tipi)
  { path: 'types', component: TypesComponent },
  // Lista dei pokemon di un tipo, riceve il nome del tipo come parametro
  { path: 'pokemon/:type', component: PokemonListComponent },
  // Dettaglio di un pokemon, riceve l'id come parametro
  { path: 'detail/:id', component: PokemonDetailComponent }
];