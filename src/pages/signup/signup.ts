import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserOptionsSignup } from '../../interfaces/user-options-signup';

import { TabsPage } from '../tabs-page/tabs-page';

import { ConferenceData } from '../../providers/conference-data';

// import {Md5} from 'ts-md5/dist/md5';


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {

  responseData: any;
  private signupData: UserOptionsSignup = {
  "loginId" : "",
  "password" : "",
  "firstName" : "",
  "lastName" : "",
  "age": null,
  "emailId" : "",
  "contactNumber" : ""
};
public toNum(event): number{return +event;}
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData, public authservice: ConferenceData ) {}


  onSignup(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      console.log(typeof this.signupData.age);
      console.log(this.signupData);
      this.authservice.postData(this.signupData, "signup").then((result) =>{
      this.responseData = result;
      console.log(this.responseData);
      this.userData.signup(this.signupData.loginId);
      this.navCtrl.push(TabsPage);
      }, (err) => {
          this.responseData = err
          console.log(err);

      });

    }
  }
}
