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

  presentshareModal() {
    let shareModal = this.modalCtrl.create('ShareModal', { userId: 8675309 });
    shareModal.present();
  }

  Like() {
    this.active = !this.active;
  }

}