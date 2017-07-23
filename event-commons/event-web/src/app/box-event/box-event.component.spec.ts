import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxEventComponent } from './box-event.component';

describe('BoxEventComponent', () => {
  let component: BoxEventComponent;
  let fixture: ComponentFixture<BoxEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
