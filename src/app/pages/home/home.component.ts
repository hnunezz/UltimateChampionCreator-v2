import { NgClass, NgStyle } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChampionsService, IChampion, IChampionSpell, ISpellList, IUltimateChampion } from '../../core';
import { TriangleComponent, UccButtonComponent } from '../../shared/components';
import { SpellsComponent } from '../spells/spells.component';
import { FooterComponent } from '../footer/footer.component';
import { DialogService } from '../../core/services/dialog.service';
import { ChampionSelectDialogComponent } from '../champion-select/champion-select-dialog.component';

@Component({
  selector: 'ucc-home',
  imports: [NgClass, UccButtonComponent, FooterComponent, SpellsComponent, NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly destroyRef = inject(DestroyRef);
  private championsService = inject(ChampionsService);
  private dialogService = inject(DialogService);

  urlBase = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/'
  urlBaseSpell = 'https://ddragon.leagueoflegends.com/cdn/15.10.1/img/spell/';
  urlBasePassive = 'https://ddragon.leagueoflegends.com/cdn/15.10.1/img/passive/';

  hasChampionSelected: boolean = false;
  loading: boolean = false;
  championsList: IChampion[] = [];

  spellsList: ISpellList = {
    P: [],
    Q: [],
    W: [],
    E: [],
    R: [],
  }

  ultimateChampion = {
    champion: {} as IChampion,
    spells: {
      P: {} as IChampionSpell,
      Q: {} as IChampionSpell,
      W: {} as IChampionSpell,
      E: {} as IChampionSpell,
      R: {} as IChampionSpell,
    }
  };

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

  openChampionSelectDialog() {
    this.dialogService
      .open(ChampionSelectDialogComponent, {
        data: {
          championsList: this.championsList,
        }
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response: IChampion) => {
        if (response) {
          this.handleChampion(response);
        }
      });
  }

  handleSpells(spells: any) {
    this.ultimateChampion.spells = spells;
  }

  private handleChampion(champion: IChampion) {
    this.hasChampionSelected = true;
    this.ultimateChampion.champion = champion;
  }

  private getSpells(championsList: IChampion[]) {
    championsList.forEach((champion) => {
      this.spellsList.P.push({ ...champion.passive, championName: champion.name, selected: false });
      this.spellsList.Q.push({ ...champion.spells[0], championName: champion.name, selected: false });
      this.spellsList.W.push({ ...champion.spells[1], championName: champion.name, selected: false });
      this.spellsList.E.push({ ...champion.spells[2], championName: champion.name, selected: false });
      this.spellsList.R.push({ ...champion.spells[3], championName: champion.name, selected: false });
    })
  }
}
