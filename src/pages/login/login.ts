import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserOptionsSignin } from '../../interfaces/user-options-signin';

import { TabsPage } from '../tabs-page/tabs-page';
import { SignupPage } from '../signup/signup';
import {ConferenceData} from "../../providers/conference-data";
// import {Md5} from 'ts-md5/dist/md5';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  responseData: any;
  // password: any;
  // encryptedPwd = Md5.hashStr(this.password);
  login: UserOptionsSignin = {
  "loginId": "",
  "password": ""
}
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData, public authservice: ConferenceData) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.authservice.postData(this.login, "login").then((result) =>{
      this.responseData = result;
      console.log(this.responseData);
      this.userData.signup(this.login.loginId);
      this.navCtrl.push(TabsPage);
      }, (err) => {
          this.responseData = err
          console.log(err);

      });
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
