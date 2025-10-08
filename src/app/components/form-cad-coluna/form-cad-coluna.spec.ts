import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadColunaComponent } from './form-cad-coluna';

describe('FormCadColunaComponent', () => {
  let component: FormCadColunaComponent;
  let fixture: ComponentFixture<FormCadColunaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCadColunaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCadColunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
