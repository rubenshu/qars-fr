import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredcarsComponent } from './filteredcars.component';

describe('FilteredcarsComponent', () => {
  let component: FilteredcarsComponent;
  let fixture: ComponentFixture<FilteredcarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteredcarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredcarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
