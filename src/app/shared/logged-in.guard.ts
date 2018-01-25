import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserService} from "./user.service";
import {Location} from "@angular/common";

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private _userService: UserService,
              private _router: Router,
              private _location: Location) {

  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._userService.isLoggedin) {
      return true;
    } else {
      // ha nincs jogom, akkor visszatér a kiindulási pontba
      this._router.navigate([this._location.path()]);
      return false;
    }
  }
}
