import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokeRepoService } from '../core/Repo/poke-repo.service';
import { PokeList, PokeCard } from '../core/model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { StoreService } from '../core/store/store.service';

@Component({
  selector: 'isdi-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  template: `@if(pokemonDetails$ | async; as PokeCard){
    <ul>
      @for (item of PokeCard; track item.name){
      <li class="img">
        <img
          [alt]="'Image of ' + item.name"
          [width]="200"
          [src]="
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' +
            item.id +
            '.png'
          "
        />
      </li>
      <li>
        <span
          >Nombre:
          <p>{{ item.name }}</p></span
        >
      </li>
      <li>
        <span
          >Peso:
          <p>{{ item.height }}</p></span
        >
      </li>
      <li>
        <span
          >Altura:
          <p>{{ item.weight }}</p></span
        >
      </li>

      }
    </ul>
    }`,
  styleUrl: './app.component.css',
})
export class AppComponent {
  public pokemonResults$!: Observable<PokeList>;
  public pokemonDetails$!: Observable<PokeCard[]>;

  constructor(private ApiSrv: PokeRepoService, private StoreSrv: StoreService) {
    this.pokemonResults$ = this.ApiSrv.getList();
    this.pokemonDetails$ = this.StoreSrv.getPokemonDetails();
  }
}
