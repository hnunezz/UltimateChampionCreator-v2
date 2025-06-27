import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UccSnackbarComponent } from './ucc-snackbar.component';

describe('UccSnackbarComponent', () => {
  let component: UccSnackbarComponent;
  let fixture: ComponentFixture<UccSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UccSnackbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UccSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
