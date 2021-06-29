import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrateRouterComponent } from './administrate-router.component';

describe('AdministrateRouterComponent', () => {
  let component: AdministrateRouterComponent;
  let fixture: ComponentFixture<AdministrateRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrateRouterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrateRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
