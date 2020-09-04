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
  maxLength = 1000;

  form = this.fb.group({
    todo: ['', [Validators.required, Validators.maxLength(this.maxLength)]],
    done: ['', [Validators.required, Validators.maxLength(this.maxLength)]],
    log: ['', [Validators.required, Validators.maxLength(this.maxLength)]],
  });

  readonly ctrls = [
    {
      label: '今日やること',
      name: 'todo',
      placeholder: '今日やることを書き出してみましょう！',
      control: this.todoControl
    },
    {
      label: '今日やったこと',
      name: 'done',
      placeholder: '今日やったことは何ですか？',
      control: this.doneControl
    },
    {
      label: '今日の感想',
      name: 'log',
      placeholder: '今日の学びで気づいたこと、感じたことをメモしましょう！',
      control: this.logControl
    },
  ];

  get todoControl() {
    return this.form.get('todo') as FormControl;
  }

  get doneControl() {
    return this.form.get('done') as FormControl;
  }

  get logControl() {
    return this.form.get('log') as FormControl;
  }

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
      { property: 'twitter:title', content: 'TSUMU - 今日のつみあげをフォームに入力' },
      { property: 'twitter:url', content: 'https://tsumu-3eb2a.web.app/' },
      { property: 'twitter:description', content: 'その日やったことや学んだことをフォームに入力し、保存する。' },
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
      authorId: this.authService.uid,
    });
    this.isComplete = true;
  }
}

