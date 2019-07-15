import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsMassageComponent } from './statistics-massage.component';

describe('StatisticsMassageComponent', () => {
  let component: StatisticsMassageComponent;
  let fixture: ComponentFixture<StatisticsMassageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsMassageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsMassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
