import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-mypage-profile',
  templateUrl: './mypage-profile.component.html',
  styleUrls: ['./mypage-profile.component.scss']
})
export class MypageProfileComponent implements OnInit {
  uid: string = this.authService.uid;
  user$: Observable<User> = this.authService.user$;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
