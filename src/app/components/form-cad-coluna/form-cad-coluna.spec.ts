import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadColuna } from './form-cad-coluna';

describe('FormCadColuna', () => {
  let component: FormCadColuna;
  let fixture: ComponentFixture<FormCadColuna>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCadColuna]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCadColuna);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
