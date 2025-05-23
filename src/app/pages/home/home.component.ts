import { NgClass } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChampionsService, IChampion, ISpellList } from '../../core';
import { TriangleComponent, UccButtonComponent } from '../../shared/components';
import { SpellsComponent } from '../spells/spells.component';

@Component({
  selector: 'ucc-home',
  imports: [NgClass, UccButtonComponent, TriangleComponent, SpellsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly destroyRef = inject(DestroyRef);
  private championsService = inject(ChampionsService);

  loading: boolean = false;
  championsList: IChampion[] = [];

  spellsList: ISpellList = {
    P: [],
    Q: [],
    W: [],
    E: [],
    R: [],
  }

  hasChampionSelected: boolean = false;
  constructor() {
    this.getAll();
  }

  private getAll() {
    this.loading = true;
    this.championsService
      .getAll()
      .pipe(
        // finalize(() => (this.loading = false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (response) => {
          this.championsList = response as IChampion[];
          this.getSpells(this.championsList);

          this.loading = false;
        },
        error: (errorMessage: string) =>
          console.error(errorMessage),
      });
  }

  getSpells(championsList: IChampion[]) {
    championsList.forEach((champion) => {
      this.spellsList.P.push({ ...champion.passive, });
      this.spellsList.Q.push({ ...champion.spells[0], });
      this.spellsList.W.push({ ...champion.spells[1], });
      this.spellsList.E.push({ ...champion.spells[2], });
      this.spellsList.R.push({ ...champion.spells[3], });
    })
  }
}
