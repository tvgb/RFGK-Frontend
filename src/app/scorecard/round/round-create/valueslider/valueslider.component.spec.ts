import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuesliderComponent } from './valueslider.component';

describe('ValuesliderComponent', () => {
  let component: ValuesliderComponent;
  let fixture: ComponentFixture<ValuesliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValuesliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuesliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
