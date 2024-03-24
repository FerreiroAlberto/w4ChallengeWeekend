import { Injectable } from '@angular/core';
import { PokeRepoService } from '../Repo/poke-repo.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PokeCard } from '../model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private urlsArray = new BehaviorSubject<string[]>([]);
  private detailsPoke = new BehaviorSubject<PokeCard[]>([]);
  private urls: string[] = [];
  constructor(private ApiSrv: PokeRepoService, private client: HttpClient) {
    this.loadUrls();
    this.loadPokemonDetails();
  }

  private loadUrls(): void {
    this.ApiSrv.getUrls().subscribe((urls) => {
      this.urls = urls;
      this.urlsArray.next(urls);
    });
  }
  private loadPokemonDetails(): void {
    this.ApiSrv.getPokeDetails().subscribe({
      next: (details: PokeCard[]) => {
        this.detailsPoke.next(details);
      },
      error: (error: Error) => {
        console.error('Failed to fetch Pokémon details', error);
      },
    });
  }

  getPokemonDetails(): Observable<PokeCard[]> {
    return this.detailsPoke.asObservable();
  }
}
