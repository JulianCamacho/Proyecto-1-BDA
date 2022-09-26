import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewClubComponent } from './add-new-club.component';

describe('AddNewClubComponent', () => {
  let component: AddNewClubComponent;
  let fixture: ComponentFixture<AddNewClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
