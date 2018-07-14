import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-browse',
  templateUrl: 'browse.html',
})
export class BrowsePage {
  dualValue2={ "lower": 255, "upper": 755};
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

}