import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  username;
  password;
  email;


  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider, private messageServiceProvider: MessageServiceProvider, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
  }

  onRegister() {
    this.authProvider.register(this.username, this.email, this.password).subscribe(data => {
      localStorage.setItem('wpIonicToken', JSON.stringify(data));
      if (localStorage.getItem('wpIonicToken')) {
        this.navCtrl.setRoot("HomePage");
      }
      this.messageServiceProvider.broadcast('tokenChanged', true); //<== add this

    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Registration failed, please try again.',
        subTitle: 'The username or email you used, already exists, login to your account or try again',
        buttons: ['Ok']
      });
      alert.present();
      console.log(err);
    });
  }


}