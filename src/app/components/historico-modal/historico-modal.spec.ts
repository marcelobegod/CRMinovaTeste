import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoricoModalComponent } from './historico-modal';



describe('HistoricoModal', () => {
  let component: HistoricoModalComponent;
  let fixture: ComponentFixture<HistoricoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
