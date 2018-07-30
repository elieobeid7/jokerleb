import { Injectable } from '@angular/core';
import { MessageServiceProvider } from '../message-service/message-service';
import { Nav } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Storage } from '@ionic/Storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';









/*
  Generated class for the SocialProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class CommonProvider {
  @ViewChild(Nav) nav: Nav;

  user: any;


  constructor(private messageServiceProvider: MessageServiceProvider, private socialSharing: SocialSharing, public storage: Storage, private facebook: Facebook) {
  }
  loginFB() {
    this.facebook.login(['email', 'public_profile']).then((res: FacebookLoginResponse) => {
      if (res.status == "connected") {
        this.messageServiceProvider.broadcast('tokenChanged', true); //<== add this
        this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
          this.user = {
            email: profile['email'],
            first_name: profile['first_name'],
            picture: profile['picture_large']['data']['url'],
            username: profile['name'],
            fb: true,
            token: res.authResponse.accessToken,
            fb_id: res.authResponse.userID
          }
          this.storage.set('loginToken', this.user);
          this.nav.setRoot("HomePage");
        });
      } else {
        console.log("An error occurred...");
      }
    }).catch((error) => {
      console.log('Error logging into Facebook', error);
    });
  }
  logout() {
    this.messageServiceProvider.broadcast('tokenChanged', false);
    this.storage.remove('loginToken');
    this.facebook.getLoginStatus().then(res => {
      if (res.status === "connected") {
        this.facebook.logout();
      }
    })
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
  favorites(item) {
    let items = [];

    this.storage.get("favorites").then((val) => {
      items = JSON.parse(val);
      if (items != null && items.length > 0) {
        if (items.indexOf(item) !== -1) {
          items.splice(item, 1);
        }
        else {
          items.push(item);
        }
      }
      else {
        let items = [];
        items.push(item);
      }
      this.storage.set('favorites', JSON.stringify(items));
    });
  }
}


