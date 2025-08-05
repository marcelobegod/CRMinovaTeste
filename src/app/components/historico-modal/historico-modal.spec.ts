import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoModal } from './historico-modal';

describe('HistoricoModal', () => {
  let component: HistoricoModal;
  let fixture: ComponentFixture<HistoricoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
