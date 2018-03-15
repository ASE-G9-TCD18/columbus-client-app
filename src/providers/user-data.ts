import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public events: Events,
    public storage: Storage
  ) {}

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  login(username: string, token: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.setUsertoken(token);
    this.events.publish('user:login');
  };

  preference(miniage: number, maxiage: number, gender:string, mingroupNumber:number, maxgroupNumber:number, rating:number): void {
    this.setMiniage(miniage);
    this.setMaxiage(maxiage);
    this.setGender(gender);
    this.setMinGroupNumber(mingroupNumber);
    this.setMaxGroupNumber(maxgroupNumber);
    this.setRating(rating);
  };

  // signup(username: string): void {
  //   this.storage.set(this.HAS_LOGGED_IN, false);
  //   // this.setUsername(username);
  //   this.events.publish('user:signup');
  // };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.storage.remove('token');
    this.events.publish('user:logout');
  };
  setMiniage(Miniage: any): void {
    this.storage.set('Miniage', Miniage);
  };

  getMiniage(): Promise<any> {
    return this.storage.get('Miniage').then((value) => {
      return value;
    });
  };

  setMaxiage(Maxiage: any): void {
    this.storage.set('Maxiage', Maxiage);
  };

  getMaxiage(): Promise<any> {
    return this.storage.get('Maxiage').then((value) => {
      return value;
    });
  };

  setGender(Gender: any): void {
    this.storage.set('Gender', Gender);
  };

  getGender(): Promise<any> {
    return this.storage.get('Gender').then((value) => {
      return value;
    });
  };

  setUsername(username: string): void {
    this.storage.set('username', username);
  };



  setMinGroupNumber(GroupNumber: any): void {
    this.storage.set('MinGroupNumber', GroupNumber);
  };

  getMinGroupNumber(): Promise<any> {
    return this.storage.get('MinGroupNumber').then((value) => {
      return value;
    });
  };

  setMaxGroupNumber(GroupNumber: any): void {
    this.storage.set('MaxGroupNumber', GroupNumber);
  };

  getMaxGroupNumber(): Promise<any> {
    return this.storage.get('MaxGroupNumber').then((value) => {
      return value;
    });
  };

  setRating(Rating: any): void {
    this.storage.set('Rating', Rating);
  };

  getRating(): Promise<any> {
    return this.storage.get('Rating').then((value) => {
      return value;
    });
  };

  setUsertoken(token: string): void {
    this.storage.set('token', token);
  };

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  getUsertoken(): Promise<string> {
    return this.storage.get('token').then((value) => {
      return value;
    });
  };

  getUserInfo

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
