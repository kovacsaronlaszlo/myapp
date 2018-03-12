import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {UserModel} from "./user-model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/do";
import {FirebaseRegistrationModel} from "./firebase-registration-model";
import "rxjs/add/observable/of";
import {ReplaySubject} from "rxjs/ReplaySubject";
import * as firebase from 'firebase';
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/mergeMap";

@Injectable()
export class UserService {
  isLoggedIn$ = new ReplaySubject<boolean>(1);

  private _user = new ReplaySubject<UserModel>(1);
  private _fbAuthData: any;

  constructor(private _router: Router,
              private _http: HttpClient) {
    firebase.auth().onAuthStateChanged(
      user => {
        if (user != null) {
          this._fbAuthData = user;
          this.getUserById(user.uid).subscribe(remoteUser => this._user.next(remoteUser));
          this.isLoggedIn$.next(true);
        } else {
          this._fbAuthData = null;
          this._user.next(null);
          this.isLoggedIn$.next(false);
        }
      }
    );
  }

  get fbIdToken(): string | null {
    return this._fbAuthData ? this._fbAuthData.idToken : null;
  }

  login(email: string, password: string): Observable<UserModel | void> {
    return Observable.fromPromise(firebase.auth().signInWithEmailAndPassword(email, password));
  }

  register(param: UserModel, password: string) {
    return this._http.post<FirebaseRegistrationModel>(
      `${environment.firebase.registrationUrl}?key=${environment.firebase.apiKey}`,
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
      .do(user => console.log('sikeresen regisztrált ez a user: ', user));
  }

  save(param: UserModel) {
    return this._http.put<UserModel>(`${environment.firebase.baseUrl}/users/${param.id}`, param);
  }

  getUserById(fbid: string) {
    return this._http.get<UserModel>(`${environment.firebase.baseUrl}/users/${fbid}.json`);
  }

  getCurrentUser() {
    return this._user.asObservable();
  }

  logout() {
    firebase.auth().signOut();
    this._router.navigate(['/home']);
    console.log('a user kilépet');
  }

  addTicket(ticketId: string): Observable<string> {
    return this._user.flatMap(
      user => {
        return this._http.patch(
          `${environment.firebase.baseUrl}/users/${user.id}/tickets.json`,
          {[ticketId]: true}
        ).map(rel => Object.keys(rel)[0]);
      }
    );

  }

  getAllUsers() {
    return this._http.get(`${environment.firebase.baseUrl}/users.json`)
      .map(usersObject => Object.values(usersObject).map(user => new UserModel(user)));
  }
}
