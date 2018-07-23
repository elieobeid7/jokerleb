import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  username;


  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onResetPassword() {
    this.authProvider.reset_password(this.username).subscribe(data => {
      console.log(data);
      localStorage.setItem('wpIonicToken', JSON.stringify(data));

    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Something went wrong, please try again',
        subTitle: 'The username or email you entered does not exist',
        buttons: ['Ok']
      });
      alert.present();
      console.log(err);
    });
  }


}