import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { CommonProvider } from '../../providers/common/comnon';




@IonicPage()
@Component({
  selector: 'page-sec-details',
  templateUrl: 'sec-details.html',
})
export class SecDetailsPage {
  active = false;
  show = false;
  item;
  _imageViewerCtrl: ImageViewerController;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, imageViewerCtrl: ImageViewerController, private commonProvider: CommonProvider) {
    this._imageViewerCtrl = imageViewerCtrl;
    this.item = this.navParams.get('item');
  }

  // active like
  Like() {
    this.active = !this.active;
  }
  // show more advantage
  showMore() {
    this.show = !this.show;
  }
  // for zoom image
  presentImage(myImage) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
  }

  shareWhatsapp(whatsappMsg) {
    this.commonProvider.shareWhatsapp(whatsappMsg);
  }

  shareFacebook(fbMsg) {
    this.commonProvider.shareWhatsapp(fbMsg);
  }

  share(msg) {
    this.commonProvider.share(msg);
  }
}




