import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditComponentComponent } from './admin-edit-component.component';

describe('AdminEditComponentComponent', () => {
  let component: AdminEditComponentComponent;
  let fixture: ComponentFixture<AdminEditComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
