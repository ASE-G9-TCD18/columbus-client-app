import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserOptionsSignup } from '../../interfaces/user-options-signup';

import { TabsPage } from '../tabs-page/tabs-page';

import { ConferenceData } from '../../providers/conference-data';


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  responseData: any;
  signupData: UserOptionsSignup = {
  "loginId" : "",
  "password" : "",
  "firstName" : "",
  "lastName" : "",
  "age": "",
  "emailId" : "",
  "phone" : ""
};
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData, public authservice: ConferenceData ) {}

  onSignup(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      
      this.authservice.postData(this.signupData, "signup").then((result) =>{
      this.responseData = result;
      console.log(this.responseData);
      this.userData.signup(this.signupData.loginId);
      this.navCtrl.push(TabsPage);
      });
      
    }
  }
}
