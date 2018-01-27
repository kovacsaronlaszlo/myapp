import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {UserModel} from "./user-model";

@Injectable()
export class UserService {
  isLoggedin = false;

  private _user: UserModel;
  private _allUsers: UserModel[];

  constructor(private _router: Router) {
    this._allUsers = this._getMockData();
  }

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

  getUserById(id: number) {
    const user = this._allUsers.filter(u => u.id === +id);
    return user.length > 0 ? user[0] : new UserModel(UserModel.emptyUser);
  }

  getCurrentUser() {
    return this._user;
  }

  private _getMockData() {
    return [
      new UserModel({
        'id': 0,
        'name': 'Kovács Áron László',
        'email': 'k.aron.laszlo@gmail.com',
        'address': 'Hadak útja',
        'dateOfBirth': '1988-01-05',
        'gender': 'male'
      }),
      new UserModel({
        'id': 1,
        'name': 'Pista ba',
        'email': 'pistaba@pistaba.com',
        'address': 'pistaba lak 12',
        'dateOfBirth': '1900-01-01',
        'gender': 'male'
      }),
      new UserModel({
        'id': 2,
        'name': 'Marcsa',
        'email': 'marcsa@marcsa.hu',
        'address': 'marcsa var 42.',
        'dateOfBirth': '2000-01-01',
        'gender': 'female'
      }),
      new UserModel({
        'id': 3,
        'name': 'ifju satan',
        'email': 'mzx@mzx.hu',
        'address': 'namek',
        'dateOfBirth': '2199-02-01',
        'gender': 'satan fattya'
      })
    ]
  }

}
