import { Component, Inject, inject, input } from '@angular/core';
import { InputTextComponent, UccButtonComponent } from '../../shared/components';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChampionsService, IChampion } from '../../core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ucc-champion-select-dialog',
  imports: [UccButtonComponent, InputTextComponent, NgClass],
  templateUrl: './champion-select-dialog.component.html',
  styleUrl: './champion-select-dialog.component.scss'
})
export class ChampionSelectDialogComponent {
  private championsService = inject(ChampionsService);

  dialogRef = inject<DialogRef<IChampion>>(DialogRef<ChampionSelectDialogComponent>);

  private championDataSource: IChampion[] = [];
  championList: IChampion[] = [];

  urlBase = 'https://ddragon.leagueoflegends.com/cdn/15.10.1/img/champion/'
  private urlBaseSplash = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/'

  model: string;

  get hasChampSelected(): boolean {
    return this.championDataSource.every((champ) => champ.selected === false);
  }

  constructor(@Inject(DIALOG_DATA) public data: { championsList: IChampion[] }) {
    this.championDataSource = data.championsList;
    this.championList = this.championDataSource;
  }

  selectChamp(champion: IChampion) {
    this.championDataSource.map(x => x.selected = false);
    champion.selected = !champion.selected;
  }

  handleSearch() {
    this.championList = this.filter();
  }

  handleSelectChampion() {
    const champSelect = this.championDataSource.find((champ) => champ.selected) as IChampion;

    const imageUrl = this.urlBaseSplash + champSelect?.id+'_0.jpg';
    console.log(imageUrl);
    this.championsService.converterImagemParaDataURI(imageUrl).then(dataURI => {
      champSelect.image.base64 = dataURI

      console.log(champSelect)
    })
      .catch(erro => {
        console.error('Erro ao converter imagem:', erro);
      });

    this.dialogRef.close(champSelect);
  }

  private filter() {
    const search = this.model.toLowerCase().trim();

    if (!search) return this.championDataSource;

    return this.championDataSource.filter(item =>
      item.name.toLowerCase().includes(search)
    );
  }
}
