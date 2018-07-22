import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

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
  error_message: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLogin() {
    console.log(this.username, this.password);
    this.authProvider.postLogin(this.username, this.password).subscribe(data => {
      console.log(data);
      localStorage.setItem('wpIonicToken', JSON.stringify(data));
      if (localStorage.getItem('wpIonicToken')) {
        this.navCtrl.push(HomePage);
      }

    } err => {
      this.error_message = "Invalid credentials. Try with username 'aa' password 'aa'.";
      console.log(err);
    });
  }

  validateLogin() {
    this.authProvider.validateLogin().subscribe(data => {
      console.log(data);
      localStorage.setItem('wpIonicToken', JSON.stringify(data));
      if (localStorage.getItem('wpIonicToken')) {
        this.navCtrl.push(HomePage);
      }

    });
  }
}