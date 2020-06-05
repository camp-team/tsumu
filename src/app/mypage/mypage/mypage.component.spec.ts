import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { mypageComponent } from './mypage.component';

describe('mypageComponent', () => {
  let component: mypageComponent;
  let fixture: ComponentFixture<mypageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [mypageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(mypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
