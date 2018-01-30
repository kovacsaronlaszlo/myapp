import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {UserModel} from "./user-model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {FirebaseLoginModel} from "./firebase-login-model";
import {environment} from "../../environments/environment";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/do";

@Injectable()
export class UserService {
  isLoggedin = false;

  private _user: UserModel;
  private _allUsers: UserModel[];

  constructor(private _router: Router,
              private _http: HttpClient) {
    this._allUsers = this._getMockData();
  }

  login(email: string, password: string): Observable<UserModel | void> {
    return this._http.post<FirebaseLoginModel>(
      `${environment.firebase.loginUrl}?key=${environment.firebase.apikey}`,
      {
        'email': email,
        'password': password,
        'returnSecureToken': true
      })
      .switchMap(fbLogin => this._http.get<UserModel>(`${environment.firebase.baseUrl}/users/${fbLogin.localId}.json`))
      .do(user => this.isLoggedin = true)
      .do(user => this._user = user);
  }

  register(param?: UserModel) {
    if (param) {
      this._user = new UserModel({
        id: 4,
        ...param
      });

      this._allUsers = [
        ...this._allUsers,
        this._user
      ]
    }
    this.isLoggedin = true;
    console.log('Be vagyok lépve? => ', this.isLoggedin);
  }

  logout() {
    // delete(this._user); vagy:
    this._user = new UserModel(); // így is meg tudjuk nézni, hogy be vagyunk e jelentkezve
    this.isLoggedin = false;
    console.log('Be vagyok lépve? => ', this.isLoggedin);
    this._router.navigate(['/home']);
  }

  updateUser(param: UserModel) {
    this._user = new UserModel(param);
  }

  getUserById(id: number) {
    const user = this._allUsers.filter(u => u.id === id);
    return user.length > 0 ? user[0] : new UserModel(UserModel.emptyUser);
  }

  getCurrentUser() {
    return this._user ? this._user : new UserModel(UserModel.emptyUser);
  }

  private _getMockData() {
    return [
      new UserModel({
        'id': 0,
        'name': 'Kovács Áron László',
        'email': 'k.aron.laszlo@gmail.com',
        'address': 'Hadak útja',
        'dateOfBirth': '1988-01-05',
        'gender': 'male',
        'profilePictureUrl': 'https://i0.wp.com/www.dargaud.com/data/img/avatars/weekly.jpg'
      }),
      new UserModel({
        'id': 1,
        'name': 'Pista ba',
        'email': 'pistaba@pistaba.com',
        'address': 'pistaba lak 12',
        'dateOfBirth': '1900-01-01',
        'gender': 'male',
        'profilePictureUrl': 'https://i.ytimg.com/vi/QjM6xbJglPY/maxresdefault.jpg'
      }),
      new UserModel({
        'id': 2,
        'name': 'Marcsa',
        'email': 'marcsa@marcsa.hu',
        'address': 'marcsa var 42.',
        'dateOfBirth': '2000-01-01',
        'gender': 'female',
        'profilePictureUrl': 'https://cdn.thisiswhyimbroke.com/images/jessica-rabbit-dress1-300x250.jpg'
      }),
      new UserModel({
        'id': 3,
        'name': 'ifju satan',
        'email': 'mzx@mzx.hu',
        'address': 'namek',
        'dateOfBirth': '2199-02-01',
        'gender': 'satan fattya',
        'profilePictureUrl': 'https://vignette.wikia.nocookie.net/uglyamericans/images/f/f0/Aldermach_Maggotbone_Evil.jpg/revision/latest?cb=20150212182907'
      })
    ]
  }

}
