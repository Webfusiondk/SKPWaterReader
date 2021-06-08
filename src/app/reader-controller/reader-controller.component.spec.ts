import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReaderControllerComponent } from './reader-controller.component';

describe('ReaderControllerComponent', () => {
  let component: ReaderControllerComponent;
  let fixture: ComponentFixture<ReaderControllerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReaderControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
