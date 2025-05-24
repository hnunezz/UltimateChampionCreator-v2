import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionSelectDialogComponent } from './champion-select-dialog.component';

describe('ChampionSelectDialogComponent', () => {
  let component: ChampionSelectDialogComponent;
  let fixture: ComponentFixture<ChampionSelectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampionSelectDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampionSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
