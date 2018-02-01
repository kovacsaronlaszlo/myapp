import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../shared/user.service";
import {UserModel} from "../../shared/user-model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: UserModel;

  private _subs: Subscription;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this._subs = this._userService.getCurrentUser().subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }

}
