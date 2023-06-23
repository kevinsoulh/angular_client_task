import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimCreatorComponent } from './claim-creator.component';

describe('ClaimCreatorComponent', () => {
  let component: ClaimCreatorComponent;
  let fixture: ComponentFixture<ClaimCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
