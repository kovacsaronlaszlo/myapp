import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {UserModel} from "./user-model";

@Injectable()
export class UserService {
  isLoggedin = false;

  private _user: UserModel;

  constructor(private _router: Router) { }

  login(email: string, password: string): boolean {
    if (email === 'angular' && password === 'angular') {
      this._user = new UserModel(UserModel.exampleUser);
      this.isLoggedin = true;
      console.log('Be vagyok lépve? => ', this.isLoggedin);
      this._router.navigate(['/user']);
    }
    return false;
  }

  register(param?: UserModel) {
    if (param)
      this._user = new UserModel(param);
    else
      this._user = new UserModel(UserModel.exampleUser);
    this.isLoggedin = true;
    console.log('Be vagyok lépve? => ', this.isLoggedin);
    this._router.navigate(['/user']);
  }

  logout() {
    // delete(this._user); vagy:
    this._user = new UserModel(); // így is meg tudjuk nézni, hogy be vagyunk e jelentkezve
    this.isLoggedin = false;
    console.log('Be vagyok lépve? => ', this.isLoggedin);
    this._router.navigate(['/home']);
  }

}
