import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNoteComfirmComponent } from './delete-note-comfirm.component';

describe('DeleteNoteComfirmComponent', () => {
  let component: DeleteNoteComfirmComponent;
  let fixture: ComponentFixture<DeleteNoteComfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteNoteComfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteNoteComfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
