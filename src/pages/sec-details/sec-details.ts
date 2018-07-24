import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { SocialSharing } from '@ionic-native/social-sharing';


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
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, imageViewerCtrl: ImageViewerController, private socialSharing: SocialSharing) {
    this._imageViewerCtrl = imageViewerCtrl;
    this.item = this.navParams.get('item');

  }
  // for share modal
  presentshareModal() {
    let shareModal = this.modalCtrl.create('ShareModal', { userId: 8675309 });
    shareModal.present();
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
    this.socialSharing.shareViaWhatsApp(whatsappMsg.title, whatsappMsg.media_details.sizes.medium.source_url, whatsappMsg.link).then(() => {
      console.log("Message sent!");
      // Success!
    }).catch((error) => {
      console.log(error);


    });
  }

  shareFacebook(fbMsg) {
    this.socialSharing.shareViaWhatsApp(fbMsg.title, fbMsg.media_details.sizes.medium.source_url, fbMsg.link).then(() => {
      console.log("Message sent!");
      // Success!
    }).catch((error) => {
      console.log(error);
    });
  }
}

