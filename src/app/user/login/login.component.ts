import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/user.service";
import {Router} from "@angular/router";
import {UserModel} from "../../shared/user-model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public error: string;

  constructor(private _userService: UserService,
              private _router: Router) {
  }

  ngOnInit() {
  }

  login(email: string, password: string) {
    this._userService.login(email, password).subscribe(
      (user: UserModel) => {
        this._router.navigate(['/user']);
      },
      err => console.warn('hibára futottunk a logincmp-ben', err)
    )
  }

  clearErrorprivat() {
    delete(this.error);
  }

}
