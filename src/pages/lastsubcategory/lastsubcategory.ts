import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ENV } from '../../environments/environment';

/**
 * Generated class for the LastsubcategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lastsubcategory',
  templateUrl: 'lastsubcategory.html',
})
export class LastsubcategoryPage {

  categories;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.categories = this.navParams.get('category');
    this.categories = this.categories.sub;
    this.categories.path = ENV.categories_icons_path;
    // console.log(this.categories);
  }
  goToCategory(category) {
    this.navCtrl.push('CategoryDetailsPage', { category: category });
  }

}
