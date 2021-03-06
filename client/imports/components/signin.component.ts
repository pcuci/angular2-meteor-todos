import {Component, NgZone} from "@angular/core";
import {Router} from "@angular/router";
import template from "./signin.html";

class SigninModel {
  constructor(public email : string, public password : string) {

  }
}

@Component({
  template
})
export class SigninComponent {
  private model : SigninModel;
  private errors : Array<string> = [];

  constructor(private router: Router, private ngZone: NgZone) {
    this.model = new SigninModel('', '');
  }


  resetErrors() {
    this.errors = [];
  }

  join() {
    this.resetErrors();

    Meteor.loginWithPassword(this.model.email, this.model.password, (err) => {
      if (err) {
        this.ngZone.run(() => {
          this.errors.push(err.reason);
        });

        return;
      }

      this.router.navigate(['/']);
    });
  }
}