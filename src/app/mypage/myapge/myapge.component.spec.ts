import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyapgeComponent } from './myapge.component';

describe('MyapgeComponent', () => {
  let component: MyapgeComponent;
  let fixture: ComponentFixture<MyapgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyapgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyapgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
