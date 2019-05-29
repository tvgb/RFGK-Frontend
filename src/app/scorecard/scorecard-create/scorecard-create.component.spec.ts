import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorecardCreateComponent } from './scorecard-create.component';

describe('ScorecardCreateComponent', () => {
  let component: ScorecardCreateComponent;
  let fixture: ComponentFixture<ScorecardCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScorecardCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecardCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
