import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoFormComponent } from './historico-form';

describe('HistoricoForm', () => {
  let component: HistoricoFormComponent;
  let fixture: ComponentFixture<HistoricoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
