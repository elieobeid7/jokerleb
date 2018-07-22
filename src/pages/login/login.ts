import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { MessageServiceProvider } from '../../providers/message-service/message-service';


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


  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider, private messageServiceProvider: MessageServiceProvider) {

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
        this.navCtrl.setRoot("HomePage");
      }
      this.messageServiceProvider.broadcast('tokenChanged', { data: true }); //<== add this

    }, err => {
      this.error_message = "Wrong username or password";
      console.log(err);
    });
  }


}