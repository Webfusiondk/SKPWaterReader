import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LocationControllerComponent } from './location-controller.component';

describe('LocationControllerComponent', () => {
  let component: LocationControllerComponent;
  let fixture: ComponentFixture<LocationControllerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
