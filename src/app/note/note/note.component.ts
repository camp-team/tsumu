import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  form = this.fb.group({
    todo: ['', [Validators.required, Validators.maxLength(1000)]],
    done: ['', [Validators.required, Validators.maxLength(1000)]],
    log: ['', [Validators.required, Validators.maxLength(1000)]],
  });

  get todoControl() {
    return this.form.get('todo') as FormControl;
  }

  get doneControl() {
    return this.form.get('done') as FormControl;
  }

  get logControl() {
    return this.form.get('log') as FormControl;
  }

  uid = this.authService.uid;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
  }

  postNote() {
    this.noteService.postNote({
      todo: this.form.value.todo,
      done: this.form.value.done,
      log: this.form.value.log,
      authorId: this.uid,
    });
  }
}
