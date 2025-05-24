import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, from, map, mergeMap, of, toArray } from 'rxjs';
import { IChampion } from '../interfaces';
import { ALL_CHAMPIONS } from '../../../../public/data/all-champions';

const API_URL = 'https://ddragon.leagueoflegends.com/cdn/15.10.1/data/pt_BR/champion'

interface IResponse {
  type: string,
  format: string,
  version: string,
  data: IChampion[]
}

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {
  private http = inject(HttpClient);
  private url = API_URL;

  getAll() {
    return from(ALL_CHAMPIONS).pipe(
      mergeMap(
        name => this.http.get(`${this.url}/${name}.json`).pipe(
          map((response: any) => ({ ...response.data[name], selected: false } as IChampion)),
          catchError(error => {
            console.error(`Erro ao buscar ${name}:`, error);
            return of(null);
          })
        ),
        5
      ),
      toArray()
    );
  }
}
