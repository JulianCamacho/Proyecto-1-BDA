import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestedInClubComponent } from './interested-in-club.component';

describe('InterestedInClubComponent', () => {
  let component: InterestedInClubComponent;
  let fixture: ComponentFixture<InterestedInClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestedInClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestedInClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
