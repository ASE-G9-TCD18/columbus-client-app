import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the RatingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html',
})
export class RatingPage {

  public titleName: any;
  public rating: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

    this.titleName = navParams.data['title']
    if (navParams.data['stars'] != undefined){
      this.rating = navParams.data['stars']
    }

  }

  onModelChange(_event){
    this.rating = _event;
    console.log("You rating for this trip is " + _event);
  }

  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }

  closeModal(){
    this.dismiss(this.rating);
  }

}
