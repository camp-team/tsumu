import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Target } from 'src/app/interfaces/target';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  targets: Target[] = [
    { genre: 'Angular' },
    { genre: 'React' },
    { genre: 'Vue' },
  ];
  form = this.fb.group({
    bio: ['', [Validators.required, Validators.maxLength(160)]],
    tag: ['', Validators.required]
  });

  get bioControl() {
    return this.form.get('bio') as FormControl;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  saveEdit() {

  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.targets.push({ genre: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(targets: Target): void {
    const index = this.targets.indexOf(targets);

    if (index >= 0) {
      this.targets.splice(index, 1);
    }
  }

}
