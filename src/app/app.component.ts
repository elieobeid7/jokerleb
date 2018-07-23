import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MessageServiceProvider } from '../providers/message-service/message-service';
import { AddPage } from "../pages/add/add";





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "HomePage";
  token: boolean = false;

  pages: Array<any>;


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private messageServiceProvider: MessageServiceProvider) {
    this.messageServiceProvider.myAppEvent$.subscribe(ev => {
      if (ev.type == 'tokenChanged') {
        this.token = ev.data;
        console.log(this.token + "this is true");

      }
    });
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: 'HomePage', icon: 'md-home' }
      /*     { title: 'Browse ads', component: 'BrowsePage', icon: 'md-search' },
             { title: 'Profile', component: 'ProfilePage', icon: 'md-person' },
             { title: 'my ads', component: 'MyAdsPage', icon: 'md-paper' }  */
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goTo(page) {
    this.nav.setRoot(page);
  }


  ionViewDidLoad() {


  }
  logout() {
    this.messageServiceProvider.broadcast('tokenChanged', false);
    this.nav.setRoot("HomePage");
    console.log(this.token + "this is false");

  }


}