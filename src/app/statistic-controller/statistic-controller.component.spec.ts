import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticControllerComponent } from './statistic-controller.component';

describe('StatisticControllerComponent', () => {
  let component: StatisticControllerComponent;
  let fixture: ComponentFixture<StatisticControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
