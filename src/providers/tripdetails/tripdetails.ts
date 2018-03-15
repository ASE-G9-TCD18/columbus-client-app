import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TripdetailsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TripdetailsProvider {

  constructor(public http: HttpClient) {

  }

  loaddata(){
    console.log('Hello TripdetailsProvider Provider');
  }

}
