import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionesComponent } from './adiciones.component';

describe('AdicionesComponent', () => {
  let component: AdicionesComponent;
  let fixture: ComponentFixture<AdicionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
