import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

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

  uid$ = this.authService.uid$.subscribe();


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private postService: PostService
  ) { }

  ngOnInit(): void { }

  postNote() {
    this.postService.postNote({
      text: this.form.value,
      authorId: this.uid$,
    });
  }
}
