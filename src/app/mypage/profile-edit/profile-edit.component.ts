import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';


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
  targets: string[] = [
    'Angular',
    'React',
    'Vue'
  ];

  uid = this.authService.uid;
  form = this.fb.group({
    bio: ['', [Validators.required, Validators.maxLength(160)]],
    genres: [['']]
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    // クエリーパラメータのidを取得してuser$に変換する
    this.route.queryParamMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        return this.userService.getUser(id);
      }),
      // userをbioとgenresのみを持つデータに変換
      map(user => {
        const bioAndGenres = {
          bio: user.bio,
          genres: user.genres
        };
        if (bioAndGenres) {
          return bioAndGenres;
        }
      })
    ).subscribe(bioAndGenres => {
      this.form.patchValue({
        bio: bioAndGenres.bio,
      });
      this.targets = bioAndGenres.genres;
    });
  }

  ngOnInit(): void {
  }

  saveProfile() {
    const bio = this.form.value.bio;
    this.userService.saveProfile(this.uid, this.targets, bio);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our targets
    if ((value || '').trim()) {
      this.targets.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(targets: string): void {
    const index = this.targets.indexOf(targets);

    if (index >= 0) {
      this.targets.splice(index, 1);
    }
  }

}
