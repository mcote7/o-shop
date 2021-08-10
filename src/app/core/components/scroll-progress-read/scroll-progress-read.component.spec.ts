import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollProgressReadComponent } from './scroll-progress-read.component';

describe('ScrollProgressReadComponent', () => {
  let component: ScrollProgressReadComponent;
  let fixture: ComponentFixture<ScrollProgressReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollProgressReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollProgressReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
