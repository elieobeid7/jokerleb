import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { CommonProvider } from '../../providers/common/comnon';
import { Storage } from '@ionic/Storage';





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
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, imageViewerCtrl: ImageViewerController, private commonProvider: CommonProvider, public storage: Storage) {
    this._imageViewerCtrl = imageViewerCtrl;
    this.item = this.navParams.get('item');
    this.likeChecker(this.item);

  }

  likeChecker(item) { // check if the item is in favorites, if so, make the heat color read, by calling  like()
    let items = [];
    let counter = 0;
    this.storage.get("favorites").then((val) => {
      items = JSON.parse(val);
      if (items != null && items.length > 0) {
        if (items.indexOf(item) !== -1 && counter == 0) {
          console.log("item found");
          this.active = !this.active;
          counter++;
          console.log("item liked");
        }
      }
    });
  }
  // active like
  like(item) {
    this.active = !this.active;
    this.commonProvider.favorites(item);
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




