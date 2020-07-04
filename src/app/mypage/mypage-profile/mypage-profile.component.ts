import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-mypage-profile',
  templateUrl: './mypage-profile.component.html',
  styleUrls: ['./mypage-profile.component.scss']
})
export class MypageProfileComponent implements OnInit {
  uid: string = this.authService.uid;
  user$: Observable<User>;
  isEditable: boolean;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dialog: MatDialog,
    private route: ActivatedRoute) {
    this.authService.user$.pipe(
      tap(user => console.log(user))
    ).subscribe();
    this.route.queryParamMap.subscribe(map => {
      const query = map.get('id');
      this.user$ = this.userService.getUser(query);
      this.isEditable = this.userService.IsEditable(query, this.uid);
    });
  }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(ProfileEditComponent, {
      // height: '580px',
      // width: '640px',
      autoFocus: false,
      restoreFocus: false
    });
  }

}
