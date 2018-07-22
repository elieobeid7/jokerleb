import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Camera } from '@ionic-native/camera';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { AdsProvider } from '../providers/ads/ads';
import { HttpClientModule } from '@angular/common/http';
import { MessageServiceProvider } from '../providers/message-service/message-service';




var config = {
  backButtonText: '',
  backButtonIcon: 'md-arrow-back',
  pageTransition: 'md',
  mode: 'md'
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp, config),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    AdsProvider,
    MessageServiceProvider
  ]
})
export class AppModule { }