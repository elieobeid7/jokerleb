import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { MessageServiceProvider } from '../message-service/message-service';
import { NavController } from 'ionic-angular';
import { Nav } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';






/*
  Generated class for the SocialProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class CommonProvider {
  @ViewChild(Nav) nav: Nav;

  user: any;

  constructor(private facebook: Facebook, private messageServiceProvider: MessageServiceProvider, public navCtrl: NavController, private socialSharing: SocialSharing) {
  }
  loginFB() {
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.messageServiceProvider.broadcast('tokenChanged', true); //<== add this
      this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.user = { email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name'], fb: true }
        localStorage.setItem('loginToken', JSON.stringify(this.user));
        this.navCtrl.setRoot("HomePage");

      });
    });
  }

  logout() {
    this.messageServiceProvider.broadcast('tokenChanged', false);
    localStorage.removeItem('loginToken');
    this.nav.setRoot("HomePage");

  }
  shareWhatsapp(whatsappMsg) {
    this.socialSharing.shareViaWhatsApp(whatsappMsg.title, whatsappMsg.media[whatsappMsg.media.length - 1].media_details.sizes.medium.source_url, whatsappMsg.link)
      .then(() => {
        console.log("Message sent!");
        // Success!
      }).catch((error) => {
        console.log(error);
      });
  }

  shareFacebook(fbMsg) {
    this.socialSharing.shareViaWhatsApp(fbMsg.title, fbMsg.media[fbMsg.media.length - 1].media_details.sizes.medium.source_url, fbMsg.link)
      .then(() => {
        console.log("Message sent!");
        // Success!
      }).catch((error) => {
        console.log(error);
      });
  }
  share(msg) {
    this.socialSharing.share(msg.title, msg.media[msg.media.length - 1].media_details.sizes.medium.source_url, msg.link)
      .then(() => {
        console.log("Message sent!");
        // Success!
      }).catch((error) => {
        console.log(error);
      });
  }

}


