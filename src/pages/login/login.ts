import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { MessageServiceProvider } from '../../providers/message-service/message-service';
import { CommonProvider } from '../../providers/common/comnon';
import { Storage } from '@ionic/Storage';




/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username;
  password;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider, private messageServiceProvider: MessageServiceProvider, public alertCtrl: AlertController, private commonProvider: CommonProvider, public storage: Storage) {


  }

  ionViewDidLoad() {
  }

  onLogin() {
    this.authProvider.postLogin(this.username, this.password).subscribe(data => {
      this.storage.set('loginToken', data);
      this.navCtrl.setRoot("HomePage");
      this.messageServiceProvider.broadcast('tokenChanged', true); //<== add this

    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Wrong email, username or password',
        subTitle: 'Please try again',
        buttons: ['Ok']
      });
      alert.present();
      console.log(err);
    });
  }
  loginWithFb() {
    this.commonProvider.loginFB();
  }
}