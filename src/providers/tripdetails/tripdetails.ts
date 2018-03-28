import {Http, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';



/*
  Generated class for the TripdetailsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class TripdetailsProvider {

  constructor(public http: Http) {

  }
  token:any;

  //This function will provide list of all trips created by user
  loaddata(token: any){

    console.log("Inside Load Data");

    return new Promise((resolve, reject) =>{
      let headers = new Headers()


      console.log("-----------"+token);
      headers.set('Authorization','Bearer '+ token)
      this.http.get("http://52.212.149.132:8080/trips", {headers}).subscribe(res =>{
        resolve(res.json());
      }, (err)=> {
        reject(err.json());
      });
    });

  }

  //This function will provide list of all trips from the backend
  alltriplist(token: any){

    console.log("Inside provider: loaddata");

    try {
      return new Promise((resolve, reject) => {
        let headers = new Headers()


        console.log("-----------" + token);
        headers.set('Authorization', 'Bearer ' + token)
        this.http.get("http://52.212.149.132:8080/trips/all", {headers}).subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err.json());
        });
      });
    }catch (error){
      console.log("Error Loading data");
      alert("Error Loading data. Please refresh");
      throw new Error("Am here");
    }

  }

  //This function will provide list of joined trips from the backend
  joinedtriplist(token: any){

    console.log("Inside Load Data");

    return new Promise((resolve, reject) =>{
      let headers = new Headers()


      console.log("-----------"+token);
      headers.set('Authorization','Bearer '+ token)
      this.http.get("http://52.212.149.132:8080/joinedtrips", {headers}).subscribe(res =>{
        resolve(res.json());
      }, (err)=> {
        reject(err.json());
      });
    });

  }



}
