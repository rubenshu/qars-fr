import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsFromEstablishmentComponent } from './cars-from-establishment.component';

describe('CarsFromEstablishmentComponent', () => {
  let component: CarsFromEstablishmentComponent;
  let fixture: ComponentFixture<CarsFromEstablishmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsFromEstablishmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsFromEstablishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
