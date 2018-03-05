import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

import {NavController, LoadingController} from 'ionic-angular';

import {UserData} from '../../providers/user-data';

import {UserOptionsSignin} from '../../interfaces/user-options-signin';

import {MapPage} from '../map/map';
import {SignupPage} from '../signup/signup';
import {ConferenceData} from "../../providers/conference-data";

// import {Md5} from 'ts-md5/dist/md5';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  responseData: any;
  errresponse: any = "200";
  errMessage: any;
  // password: any;
  // encryptedPwd = Md5.hashStr(this.password);
  private login: UserOptionsSignin =
    {

      "loginId": "agraharrr",
      "password": "agraharrr"

    };
  submitted = false;

  constructor(public loader: LoadingController, public navCtrl: NavController, public userData: UserData, public authservice: ConferenceData) {
  }

  onLogin(form: NgForm) {
    this.submitted = true;
    let loading = this.loader.create({content: "Logging in ,please wait..."});
    console.log(this.login)
    loading.present();
    if (form.valid) {
      this.authservice.postDataLogin(JSON.stringify(this.login), "login")
        .then(
          (result) => {
            this.responseData = result;
            console.log(this.responseData);
            this.userData.login(this.login.loginId, this.responseData);
            loading.dismissAll();
            this.navCtrl.push(MapPage);
          },
          (err) => {
            this.errresponse = err
            console.log(err);
            loading.dismissAll();
            this.errMessage = this.errresponse.message;
            console.log("here is the error" + this.errresponse.message);

          });
    }
  }

  checkStatus(){
    if(this.errresponse != "200"){
      return "Error";
    }
    else {
      return "ok"
    }

  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
