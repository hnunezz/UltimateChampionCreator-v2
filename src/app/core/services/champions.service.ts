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

  // async converterImagemParaDataURI(url: string): Promise<string> {
  //   const resposta = await fetch(url);
  //   const blob = await resposta.blob();
  //   return new Promise((resolve, reject) => {
  //     const leitor = new FileReader();
  //     leitor.onloadend = () => {
  //       if (leitor.result && typeof leitor.result === 'string') {
  //         resolve(leitor.result);
  //       } else {
  //         reject(new Error('Falha ao converter o blob em Data URI.'));
  //       }
  //     };
  //     leitor.onerror = () => reject(new Error('Erro ao ler o blob.'));
  //     leitor.readAsDataURL(blob);
  //   });
  // }

  finalizeSpellView$(): Observable<boolean> {
    return this.finalizeSpellViewSubject.asObservable();
  }

  cacheDataURI = new Map<string, string>();
  preloadQueue: string[] = [];
  preloadConcurrency = 4;
  activePreloads = 0;

  /**
   * Converte uma imagem para Data URI com cache e preload.
   */
  async converterImagemParaDataURI(url: string): Promise<string> {
    if (this.cacheDataURI.has(url)) {
      return this.cacheDataURI.get(url)!;
    }

    const dataURI = await this.fetchAndConvert(url);
    this.cacheDataURI.set(url, dataURI);
    return dataURI;
  }

  /**
   * Pré-carrega uma lista de URLs com limite de concorrência.
   */
  preloadImagens(urls: string[]) {
    this.preloadQueue.push(...urls);

    // Dispara múltiplos carregamentos respeitando o limite
    for (let i = 0; i < this.preloadConcurrency; i++) {
      this.processarProximaPreload();
    }
  }

  async processarProximaPreload() {
    if (this.activePreloads >= this.preloadConcurrency || this.preloadQueue.length === 0) {
      return;
    }

    const url = this.preloadQueue.shift();
    if (!url || this.cacheDataURI.has(url)) {
      this.processarProximaPreload(); // Pula imagens já no cache
      return;
    }

    this.activePreloads++;

    try {
      const dataURI = await this.fetchAndConvert(url);
      this.cacheDataURI.set(url, dataURI);
    } catch (erro) {
      console.warn(`Erro ao pré-carregar imagem ${url}`, erro);
    } finally {
      this.activePreloads--;
      this.processarProximaPreload(); // Continua fila
    }
  }

  async fetchAndConvert(url: string): Promise<string> {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error(`Erro ao buscar imagem: ${resposta.status} ${resposta.statusText}`);
    }

    const buffer = await resposta.arrayBuffer();
    const base64 = this.arrayBufferToBase64(buffer);
    const mimeType = resposta.headers.get('Content-Type') || 'image/jpeg';
    return `data:${mimeType};base64,${base64}`;
  }

  arrayBufferToBase64(buffer: ArrayBuffer): string {
    const binary = String.fromCharCode(...new Uint8Array(buffer));
    return btoa(binary);
  }
}
