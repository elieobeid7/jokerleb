import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecDetailsPage } from './sec-details';

@NgModule({
  declarations: [
    SecDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SecDetailsPage),
  ],
})
export class SecDetailsPageModule {}
