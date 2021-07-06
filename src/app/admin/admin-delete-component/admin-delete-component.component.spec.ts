import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeleteComponentComponent } from './admin-delete-component.component';

describe('AdminDeleteComponentComponent', () => {
  let component: AdminDeleteComponentComponent;
  let fixture: ComponentFixture<AdminDeleteComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDeleteComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeleteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
