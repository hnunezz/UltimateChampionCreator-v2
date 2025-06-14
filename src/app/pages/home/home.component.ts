import { NgClass, NgStyle } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ShepherdService } from 'angular-shepherd';
import { ChampionsService, IChampion, IChampionSpell, ISpellList } from '../../core';
import { DialogService } from '../../core/services/dialog.service';
import { UccButtonComponent } from '../../shared/components';
import { ChampionSelectDialogComponent } from '../champion-select/champion-select-dialog.component';
import { FooterComponent } from '../footer/footer.component';
import { ShareComponent } from '../share/share.component';
import { SpellsComponent } from '../spells/spells.component';

@Component({
  selector: 'ucc-home',
  imports: [NgClass, UccButtonComponent, FooterComponent, SpellsComponent, NgStyle, ShareComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly destroyRef = inject(DestroyRef);
  private championsService = inject(ChampionsService);
  private dialogService = inject(DialogService);

  urlBaseSplash = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/'
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

  constructor(private shepherdService: ShepherdService) {
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

          this.fucksteps()
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

  fucksteps() {
    const STEPS_BUTTONS = {
      back: {
        classes: "back-button",
        secondary: true,
        text: "Voltar",
        type: "back",
      },
      cancel: {
        classes: "cancel-button",
        secondary: true,
        text: "Sair",
        type: "cancel",
      },
      next: {
        classes: "next-button",
        text: "Próximo",
        type: "next"
      }
    };

    this.shepherdService.defaultStepOptions = {
      classes: 'custom-class-name-1 custom-class-name-2',
      scrollTo: false,
      cancelIcon: {
        enabled: true
      }
    };

    this.shepherdService.modal = true;
    this.shepherdService.addSteps([
      {
        attachTo: {
          element: ".title",
          on: "bottom"
        },
        scrollTo: true,
        buttons: [STEPS_BUTTONS.cancel, STEPS_BUTTONS.next],
        classes: "custom-class-name-1 custom-class-name-2",
        id: "intro",
        title: "🚀 Ultimate Champion Creator!",
        text: ` Bem-vindo, <br/> Vamos embarcar em um tour para criar seu campeão?`
      },
      {
        canClickTarget: false,
        attachTo: {
          element: "ucc-button",
          on: "top"
        },
        scrollTo: true,
        buttons: [
          STEPS_BUTTONS.back,
          STEPS_BUTTONS.next
        ],
        classes: "custom-class-name-1 custom-class-name-2",
        id: "installation",
        title: "🎮 Seleção do Campeão",
        text: "Primeiro, vamos escolher um campeão base cujas habilidades serão modificadas!"

      },
      {
        attachTo: {
          element: ".champion-spell-content",
          on: "bottom"
        },
        scrollTo: true,
        buttons: [STEPS_BUTTONS.back, STEPS_BUTTONS.next],
        classes: "custom-class-name-1 custom-class-name-2",
        id: "usage",
        title: "⚔️ Seleção das Habilidades",
        text: "Agora é hora de escolher as habilidades do seu campeão! Vamos definir a habilidade para cada tecla, incluindo a passiva <br/> 🎯 Momento de pegar aquela skill “roubada”!",
        cancelIcon: {
          enabled: false
        }
      },
      {
        canClickTarget: true,
        attachTo: {
          element: ".nick-section",
          on: "bottom"
        },
        scrollTo: true,
        buttons: [STEPS_BUTTONS.back, STEPS_BUTTONS.next],
        classes: "custom-class-name-1 custom-class-name-2",
        id: "usage",
        text: 'Adicione seu nick!',
        cancelIcon: {
          enabled: false
        }
      },
      {
        attachTo: {
          element: ".share-button",
          on: "bottom"
        },
        scrollTo: true,
        buttons: [STEPS_BUTTONS.back, STEPS_BUTTONS.cancel],
        classes: "custom-class-name-1 custom-class-name-2",
        id: "modal",
        text: `📣 Agora que seu campeão está completo, é hora de mostrar sua criação ao mundo`,
        cancelIcon: {
          enabled: false
        }
      }
    ]);
    this.shepherdService.start();
  }
}
