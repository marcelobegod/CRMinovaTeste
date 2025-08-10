import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoListComponent } from './historico-list';

describe('HistoricoList', () => {
  let component: HistoricoListComponent;
  let fixture: ComponentFixture<HistoricoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
