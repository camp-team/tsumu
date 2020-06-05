import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypageCardComponent } from './mypage-card.component';

describe('MypageCardComponent', () => {
  let component: MypageCardComponent;
  let fixture: ComponentFixture<MypageCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypageCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
