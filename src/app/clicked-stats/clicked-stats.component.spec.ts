import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickedStatsComponent } from './clicked-stats.component';

describe('ClickedStatsComponent', () => {
  let component: ClickedStatsComponent;
  let fixture: ComponentFixture<ClickedStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickedStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickedStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
