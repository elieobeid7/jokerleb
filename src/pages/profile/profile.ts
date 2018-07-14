import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import $ from "jquery";
import 'intl-tel-input';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  Disabled = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public camera: Camera) {
  }
// enable edit
  activeEdit(){
    this.Disabled=!this.Disabled;
  }
// select country code  
  ngOnInit(): any {
    let telInput = $("#elemtId");
    let output = $("#output");

    telInput.intlTelInput();
    // listen to "keyup", but also "change" to update when the user selects a country
    telInput.on("keyup change", function() {
      var intlNumber = telInput.intlTelInput("getNumber");
      if (intlNumber) {
        output.text("International: " + intlNumber);
      } else {
        output.text("Please enter a number below");
      }
    });
  }
// ActionSheet for change user picture
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your Picture',
      buttons: [
        {
          text: 'Gallery',
          handler: () => {this.get_camera(1);}
        },{
          text: 'Camera',
          handler: () => {this.get_camera(2);}
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    actionSheet.present();
  }

    get_camera=function (source) {
    const options: CameraOptions = { quality: 100,destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG, mediaType: this.camera.MediaType.PICTURE
    ,allowEdit:true,targetWidth:512,targetHeight:512,correctOrientation:true}

    if(source==1)options.sourceType= this.camera.PictureSourceType.PHOTOLIBRARY
    else options.sourceType= this.camera.PictureSourceType.CAMERA

    this.camera.getPicture(options).then((imageData) => {
      this.img='data:image/jpeg;base64,' + imageData;
    }, (err) => {
    alert('camera.getPicture ... error')
    });
  }  
}