import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../shared/user.service";
import {UserModel} from "../../shared/user-model";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user$: Observable<UserModel>;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.user$ = this._userService.getCurrentUser();
  }

}
