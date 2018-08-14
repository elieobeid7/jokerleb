import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdsProvider } from "../../providers/ads/ads";
import { ENV } from '../../environments/environment';

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  categories;


  constructor(public navCtrl: NavController, public navParams: NavParams, private adsProvider: AdsProvider) {
    this.adsProvider.getCategoris().subscribe(data => {
      this.categories = data;
      this.categories = this.categories.category;
      this.categories.path = ENV.categories_icons_path;


      // console.log(this.categories);


    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

  onSubCategories(category) {
    this.navCtrl.push('SubcategoriesPage', { category: category });
  }


}
