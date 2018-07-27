import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  active = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) { }



  Like() {
    this.active = !this.active;
  }

}