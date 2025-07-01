import { NgClass } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { ChampionsService, IChampionSpell, ISpellList } from '../../core';
import { InputTextComponent, TriangleComponent } from '../../shared/components';
import { SanitizeHtmlPipe } from '../../core/pipe/sanitize-html.pipe';

type SpellTypes = 'P' | 'Q' | 'E' | 'W' | 'R';

@Component({
  selector: 'ucc-spells',
  imports: [NgClass, TriangleComponent, InputTextComponent, SanitizeHtmlPipe],
  templateUrl: './spells.component.html',
  styleUrl: './spells.component.scss'
})
export class SpellsComponent {
  private championsService = inject(ChampionsService);

  spellsList = input<ISpellList>();
  spellsChange = output<any>();

  urlBaseSpell = 'https://ddragon.leagueoflegends.com/cdn/15.10.1/img/spell/';
  urlBasePassive = 'https://ddragon.leagueoflegends.com/cdn/15.10.1/img/passive/';

  actualSpell: SpellTypes | null;
  model: string;

  private dataSource: IChampionSpell[];
  list: IChampionSpell[];

  selectedSpells = {
    hasP: false,
    hasQ: false,
    hasW: false,
    hasE: false,
    hasR: false,
    P: {
      name: '',
      description: '',
      image: {
        full: '',
        sprite: '',
        group: '',
        base64: '',
      },
      championName: '',
      selected: false,
    },
    Q: {
      name: '',
      description: '',
      image: {
        full: '',
        sprite: '',
        group: '',
        base64: '',
      },
      championName: '',
      selected: false,
    },
    W: {
      name: '',
      description: '',
      image: {
        full: '',
        sprite: '',
        group: '',
        base64: '',
      },
      championName: '',
      selected: false,
    },
    E: {
      name: '',
      description: '',
      image: {
        full: '',
        sprite: '',
        group: '',
        base64: '',
      },
      championName: '',
      selected: false,
    },
    R: {
      name: '',
      description: '',
      image: {
        full: '',
        sprite: '',
        group: '',
        base64: '',
      },
      championName: '',
      selected: false,
    },
  }

  private isMobile: boolean = false

  constructor() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.isMobile = true;
    }

    //?reset list to dont loading images for spell list when open image view dialog
    this.championsService.finalizeSpellView$().subscribe(() => {
      this.list = []
      this.actualSpell = null
    })
  }

  setSpellSelected(spellType: SpellTypes) {

    this.actualSpell = spellType;

    const spellList = this.spellsList() as ISpellList;
    this.dataSource = spellList[spellType]
    this.list = this.dataSource
    this.model = ''

    setTimeout(() => {
      const containerListElement = document.getElementById('container-list') as HTMLElement;
      containerListElement.scrollTop = 0;
    }, 0);

    if (this.isMobile) {
      const el = document.getElementById('spell-list') as HTMLElement;
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
  }

  getUrlImagem(image: string): string {
    const url = this.actualSpell === 'P' ? this.urlBasePassive : this.urlBaseSpell;
    return `${url}${image}`;
  }

  handleSearch(): void {
    this.list = this.filterSpell();
  }

  private filterSpell() {
    const search = this.model.toLowerCase().trim();

    if (!search) return this.dataSource;

    return this.dataSource.filter(item =>
      item.championName.toLowerCase().includes(search) ||
      item.name.toLowerCase().includes(search)
    );
  }

  lastClick = ''
  selectHability(spell: any) {
    this.list.forEach(item => {
      item.selected = item === spell;
    });

    const spellKey = this.actualSpell;

    if (['P', 'Q', 'E', 'W', 'R'].includes(spellKey as SpellTypes)) {
      this.selectedSpells[`has${spellKey as SpellTypes}`] = true;
      this.selectedSpells[spellKey as SpellTypes] = spell;
    }

    const imageUrl = this.getUrlImagem(spell.image.full);
    // if (this.selectedSpells[this.actualSpell].image.base64 === '') {

    this.championsService.converterImagemParaDataURI(imageUrl).then(dataURI => {
      this.selectedSpells[this.actualSpell as SpellTypes].image.base64 = dataURI
    })
      .catch(erro => {
        console.error('Erro ao converter imagem:', erro);
      });
    // }


    this.spellsChange.emit(this.selectedSpells)

    if (this.isMobile) {
      const el = document.getElementById('champion-spell-content') as HTMLElement;

      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
  }
}
