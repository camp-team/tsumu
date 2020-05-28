import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
