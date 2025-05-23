import { Component, input } from '@angular/core';
import { ISpellList } from '../../core';
import { NgClass } from '@angular/common';
import { TriangleComponent } from '../../shared/components';

type SpellTypes = 'P' | 'Q' | 'E' | 'W' | 'R';

@Component({
  selector: 'ucc-spells',
  imports: [NgClass, TriangleComponent],
  templateUrl: './spells.component.html',
  styleUrl: './spells.component.scss'
})
export class SpellsComponent {
  spellList = input<ISpellList[]>();
  spellSelected: SpellTypes | 'N/A' = 'N/A';

  setSpellSelected(spell: SpellTypes) {
    this.spellSelected = spell;
  }
}
