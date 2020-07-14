import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  isComplete: boolean;
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
    private noteService: NoteService,
    private title: Title,
    private meta: Meta,
  ) {
    this.title.setTitle('フォーム入力ページ | TSUMU');
    this.meta.addTags([
      { name: 'description', content: 'その日やったことや学んだことをフォームに入力し、保存する。' },
      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: 'TSUMU - 今日のつみあげをフォームに入力' },
      { property: 'og:description', content: 'その日やったことや学んだことをフォームに入力し、保存する。' },
      { property: 'og:url', content: location.href },
      { property: 'og:image', content: 'https://tsumu-3eb2a.web.app/assets/Tsumu.png' },
      { property: 'twitter:title', content: 'note' },
      { property: 'twitter:image', content: 'https://tsumu-3eb2a.web.app/assets/Tsumu.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ]);
  }

  ngOnInit(): void {
  }

  postNote() {
    this.noteService.postNote({
      todo: this.form.value.todo,
      done: this.form.value.done,
      log: this.form.value.log,
      authorId: this.uid,
    });
    this.isComplete = true;
  }
}
