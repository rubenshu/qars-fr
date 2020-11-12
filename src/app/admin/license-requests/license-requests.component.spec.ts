import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseRequestsComponent } from './license-requests.component';

describe('LicenseRequestsComponent', () => {
  let component: LicenseRequestsComponent;
  let fixture: ComponentFixture<LicenseRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
