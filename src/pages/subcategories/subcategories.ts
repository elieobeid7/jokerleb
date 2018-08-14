import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ENV } from '../../environments/environment';



@IonicPage()
@Component({
  selector: 'page-subcategories',
  templateUrl: 'subcategories.html',
})
export class SubcategoriesPage {
  categories;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.categories = this.navParams.get('category');
    this.categories = this.categories.sub;
    this.categories.path = ENV.categories_icons_path;
    console.log(this.categories);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcategoriesPage');
  }

}
