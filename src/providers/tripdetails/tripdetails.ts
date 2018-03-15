import {Http, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


import {UserData} from "../user-data";

/*
  Generated class for the TripdetailsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class TripdetailsProvider {

  constructor(public http: Http, private userData: UserData) {

  }
  token:any;

  loaddata(){

    console.log("Inside Load Data");
    this.userData.getUsertoken().then((value)=>{
      this.token = value;
    });


    return new Promise((resolve, reject) =>{
      let headers = new Headers()
      headers.set('Authorization','Bearer '+ this.token)
      this.http.get("http://52.212.149.132:8081/trips", {headers}).subscribe(res =>{
        resolve(res.json());
      }, (err)=> {
        reject(err.json());
      });
    });

  }



}
