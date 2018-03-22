import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

import {NavController, LoadingController} from 'ionic-angular';

import {UserData} from '../../providers/user-data';

import {UserOptionsSignup} from '../../interfaces/user-options-signup';
import {UserOptionsSignin} from '../../interfaces/user-options-signin';

import {ConferenceData} from '../../providers/conference-data';
import {HomepagePage} from "../homepage/homepage";

// import {Md5} from 'ts-md5/dist/md5';


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {

  responseData: any;
  errresponse: any="200";
  errMessage: any;
  private login: UserOptionsSignin =
    {

      "loginId": "",
      "password": ""

    };
  private signupData: UserOptionsSignup =
    {
      loginId: "",
      password: "",
      firstName: "",
      lastName: "",
      age: "",
      emailId: "",
      contactNumber: "",
      userRating: 5
    };
// public toNum(event): number{return +event};
  submitted = false;

  constructor(public loader: LoadingController, public navCtrl: NavController, public userData: UserData, public authservice: ConferenceData) {
  }


  onSignup(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      let loading = this.loader.create({content: "Contacting Server ,please wait..."});
      loading.present();
      console.log(typeof this.signupData.age);
      console.log(JSON.stringify(this.signupData));
      this.authservice
        .postData(this.signupData, "signup")
        .then(
          (result) => {
          this.responseData = result;
          console.log(this.responseData);
          loading.dismissAll();
          this.navCtrl.setRoot(HomepagePage);
          this.login.loginId = this.signupData.loginId;
          this.login.password = this.signupData.password;
          this.authservice.postDataLogin(JSON.stringify(this.login), "login")
            .then(
              (result) => {
                this.responseData = result;
                console.log(this.responseData);
                this.userData.login(this.login.loginId, this.responseData);
              },
              (err) => {
                this.errresponse = err
                console.log(err);
                loading.dismissAll();
                this.errMessage = this.errresponse.message;
                console.log("here is the error" + this.errresponse.message);
              });

          },
          (err) => {
          this.errresponse = err
          console.log(err);
          // let errmsg = JSON.parse(this.errresponse)
          this.errMessage = this.errresponse.errors[0].defaultMessage;
            console.log("here is the error" + this.errresponse.errors[0].defaultMessage);
          loading.dismissAll();
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
}
