import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, from, map, mergeMap, Observable, of, toArray } from 'rxjs';
import { IChampion } from '../interfaces';
import { ALL_CHAMPIONS } from '../../../../public/data/all-champions';

const API_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class ShareImageService {
  private http = inject(HttpClient);
  private url = API_URL;

  get(id: number) {
    return this.http.get(`${this.url}/image/${id}`)
      .pipe(map((response: any) => (console.log(response))),
        catchError(error => {
          console.error(`e =>`, error);
          return of(null);
        }))
  }

  save(dataURL: any): Observable<{id: string}> {
    const data = {dataURL: dataURL};
    return this.http.post<{id: string}>(`${this.url}/save`,data)
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
}
