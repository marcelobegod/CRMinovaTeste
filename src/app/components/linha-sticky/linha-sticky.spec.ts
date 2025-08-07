import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinhaStickyComponent } from './linha-sticky';

describe('LinhaSticky', () => {
  let component: LinhaStickyComponent;
  let fixture: ComponentFixture<LinhaStickyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinhaStickyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinhaStickyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
