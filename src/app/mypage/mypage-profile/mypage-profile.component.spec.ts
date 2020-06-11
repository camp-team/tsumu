import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypageProfileComponent } from './mypage-profile.component';

describe('MypageProfileComponent', () => {
  let component: MypageProfileComponent;
  let fixture: ComponentFixture<MypageProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypageProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypageProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
