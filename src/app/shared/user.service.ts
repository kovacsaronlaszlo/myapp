import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {UserModel} from "./user-model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {FirebaseLoginModel} from "./firebase-login-model";
import {environment} from "../../environments/environment";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/do";
import {FirebaseRegistrationModel} from "./firebase-registration-model";
import "rxjs/add/observable/of";

@Injectable()
export class UserService {
  isLoggedin = false;

  private _user = new UserModel();
  private _fbAuthData: FirebaseLoginModel | FirebaseRegistrationModel | undefined;

  constructor(private _router: Router,
              private _http: HttpClient) {
  }

  login(email: string, password: string): Observable<UserModel | void> {
    return this._http.post<FirebaseLoginModel>(
      `${environment.firebase.loginUrl}?key=${environment.firebase.apikey}`,
      {
        'email': email,
        'password': password,
        'returnSecureToken': true
      })
      .do((fbAuthResponse: FirebaseLoginModel) => this._fbAuthData = fbAuthResponse)
      .switchMap(fbLogin => this.getUserById(fbLogin.localId))
      .do(user => this._user = user)
      .do(user => this.isLoggedin = true)
      .do(user => console.log(`Sikerült a belépés ezzel a userrel: ${user}`));
  }

  register(param: UserModel, password: string) {
    return this._http.post<FirebaseRegistrationModel>(
      `${environment.firebase.registrationUrl}?key=${environment.firebase.apikey}`,
      {
        'email': param.email,
        'password': password,
        'returnSecureToken': true
      }
    )
      .do((fbAuthResponse: FirebaseRegistrationModel) => this._fbAuthData = fbAuthResponse)
      .map(fbreg => {
        return {
          id: fbreg.localId,
          ...param
        };
      })
      .switchMap(user => this.save(user))
      .do(user => this.isLoggedin = true)
      .do(user => console.log(`sikeresen regisztrált ez a user: ${user}`));
  }

  save(param: UserModel) {
    return this._http.put<UserModel>(`${environment.firebase.baseUrl}/users/${param.id}`, param)
      .do(user => this._user = user);
  }

  getUserById(fbid: string) {
    return this._http.get<UserModel>(`${environment.firebase.baseUrl}/users/${fbid}.json`);
  }

  getCurrentUser() {
    return Observable.of(this._user);
  }

  logout() {
    this._user = new UserModel();
    this.isLoggedin = false;
    delete(this._fbAuthData);
    this._router.navigate(['/home']);
    console.log('a user kilépet');
  }

  getAllUsers() {
    return this._http.get(`${environment.firebase.baseUrl}/users.json`)
      .map(usersObject => Object.values(usersObject).map(user => new UserModel(user)));
  }
}
