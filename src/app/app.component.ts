import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MessageServiceProvider } from '../providers/message-service/message-service';
import { CommonProvider } from '../providers/common/comnon';
import { Storage } from '@ionic/Storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "CategoriesPage";
  token: boolean = false;
  user;
  localstorageString;
  pages: Array<any>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private messageServiceProvider: MessageServiceProvider, private commonProvider: CommonProvider, public storage: Storage) {
    this.messageServiceProvider.myAppEvent$.subscribe(ev => {
      if (ev.type == 'tokenChanged') {
        this.token = ev.data;

      }
    });
    this.initializeApp();

    this.storage.get('loginToken').then((val) => {
      this.user = val;
    });
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

  logout() {
    this.commonProvider.logout();

  }
  ionViewDidLoad() {

  }


}