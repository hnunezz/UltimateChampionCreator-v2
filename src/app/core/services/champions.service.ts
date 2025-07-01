import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, from, map, mergeMap, Observable, of, Subject, toArray } from 'rxjs';
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

  finalizeSpellViewSubject = new Subject<boolean>();

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

  async converterImagemParaDataURI(url: string): Promise<string> {
    const resposta = await fetch(url);
    const blob = await resposta.blob();
    return new Promise((resolve, reject) => {
      const leitor = new FileReader();
      leitor.onloadend = () => {
        if (leitor.result && typeof leitor.result === 'string') {
          resolve(leitor.result);
        } else {
          reject(new Error('Falha ao converter o blob em Data URI.'));
        }
      };
      leitor.onerror = () => reject(new Error('Erro ao ler o blob.'));
      leitor.readAsDataURL(blob);
    });
  }

  finalizeSpellView$(): Observable<boolean> {
    return this.finalizeSpellViewSubject.asObservable();
  }
}
