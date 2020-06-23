import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {
  user$: Observable<User>;
  navLinks = [
    {
      path: './',
      label: 'プロフィール',
    },
    {
      path: 'archive',
      label: 'つみあげ記録',
    },
    {
      path: 'settings',
      label: '設定',
    }
  ];

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.route.queryParamMap.subscribe(map => {
      const query = map.get('id');
      this.user$ = this.userService.getUser(query);
    });
  }

  ngOnInit(): void {
  }

}
