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
  onLastsubCategory(category) {
    // if category is an admin category, it means it's a wordrpress posts page
    if (category.admin) {
      this.navCtrl.push('PostsPage', { category: category });
    }
    // this is all stuff in a category
    else if (category.main) {
      this.navCtrl.push('AllCategoriesPage', { category: category });
    }
    // another sub category page
    else if (category.sub && !category.main) {
      this.navCtrl.push('LastsubcategoryPage', { category: category });
    }
    // items page
    else if (!category.sub && !category.main && !category.admin) {
      this.navCtrl.push('CategoryDetailsPage', { category: category });
    }
  }
}
