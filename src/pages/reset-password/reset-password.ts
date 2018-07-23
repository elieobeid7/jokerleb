import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
export class resetPasswordPage {

  username;
  error_message: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onResetPassword() {
    this.authProvider.reset_password(this.username).subscribe(data => {
      console.log(data);
      localStorage.setItem('wpIonicToken', JSON.stringify(data));

    }, err => {
      this.error_message = "Something Went wrong, please try again.";
      console.log(err);
    });
  }


}