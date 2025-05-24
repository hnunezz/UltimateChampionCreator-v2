import { NgClass } from '@angular/common';
import { Component, input, output, Output } from '@angular/core';
import { IChampionSpell, ISpellList } from '../../core';
import { InputTextComponent, TriangleComponent } from '../../shared/components';

type SpellTypes = 'P' | 'Q' | 'E' | 'W' | 'R';

@Component({
  selector: 'ucc-spells',
  imports: [NgClass, TriangleComponent, InputTextComponent],
  templateUrl: './spells.component.html',
  styleUrl: './spells.component.scss'
})
export class SpellsComponent {
  spellsList = input<ISpellList>();
  spellsChange = output<any>();

  urlBaseSpell = 'https://ddragon.leagueoflegends.com/cdn/15.10.1/img/spell/';
  urlBasePassive = 'https://ddragon.leagueoflegends.com/cdn/15.10.1/img/passive/';

  actualSpell: SpellTypes;
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
      },
      championName: '',
      selected: false,
    },
  }

  setSpellSelected(spellType: SpellTypes) {
    this.actualSpell = spellType;

    const spellList = this.spellsList() as ISpellList;
    this.dataSource = spellList[spellType]
    this.list = this.dataSource
    this.model = ''
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

  selectHability(spell: any) {
    this.list.forEach(item => {
      item.selected = item === spell;
    });

    switch (this.actualSpell) {
      case 'P':
        this.selectedSpells.hasP = true;
        break;
      case 'Q':
        this.selectedSpells.hasQ = true;
        break;
      case 'E':
        this.selectedSpells.hasE = true;
        break;
      case 'W':
        this.selectedSpells.hasW = true;
        break;
      case 'R':
        this.selectedSpells.hasR = true;
        break;
    }

    this.selectedSpells[this.actualSpell] = spell;

    this.spellsChange.emit(this.selectedSpells)
  }
}
