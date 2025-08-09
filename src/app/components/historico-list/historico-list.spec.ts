import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoList } from './historico-list';

describe('HistoricoList', () => {
  let component: HistoricoList;
  let fixture: ComponentFixture<HistoricoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
