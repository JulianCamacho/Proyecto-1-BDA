import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegistryComponent } from './admin-registry.component';

describe('AdminRegistryComponent', () => {
  let component: AdminRegistryComponent;
  let fixture: ComponentFixture<AdminRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegistryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
