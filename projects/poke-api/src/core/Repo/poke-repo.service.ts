import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PokeList, PokeCard } from '../model';
import { switchMap, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeRepoService {
  urlBase = 'https://pokeapi.co/api/v2/pokemon/';
  constructor(private client: HttpClient) {}
  getList(): Observable<PokeList> {
    return this.client.get<PokeList>(this.urlBase);
  }
  getUrls(): Observable<string[]> {
    return this.getList().pipe(
      map((response: PokeList) => response.results.map((item) => item.url))
    );
  }
  getPokeDetails(): Observable<PokeCard[]> {
    return this.getUrls().pipe(
      switchMap((urls) =>
        forkJoin(urls.map((url) => this.client.get<PokeCard>(url)))
      )
    );
  }
}
