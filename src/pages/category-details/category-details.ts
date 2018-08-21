import { Component, Renderer, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AdsProvider } from '../../providers/ads/ads';
/**
 * Generated class for the CategoryDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-details',
  templateUrl: 'category-details.html',
})
export class CategoryDetailsPage {
  items = [];
  page = 1;
  showSearch: any;
  tab = 1;
  tabsPosition: any;
  searchQuery;
  darkHeader: any;
  category;
  localstorageString;
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer, public zone: NgZone, public adsProvider: AdsProvider) {

    this.category = this.navParams.get('category');

    this.loadAds();
  }
  loadAds(infiniteScroll?) {
    this.adsProvider.searchAds(this.category.slug, this.page).subscribe((data: any) => {
      this.items = this.items.concat(data);
      console.log(this.items);

      if (infiniteScroll) {
        infiniteScroll.complete();
      }
    });
  }
  loadMore(infiniteScroll) {
    this.page++;
    this.loadAds(infiniteScroll);

  }
  onShowItemDetail(item) {
    this.navCtrl.push('SecDetailsPage', { item: item });
  }
  onSearch() {
    this.searchQuery = this.searchQuery.toString().toLowerCase();
    this.searchQuery = encodeURI(this.searchQuery);
    this.navCtrl.push('SearchDetailsPage', { searchQuery: this.searchQuery });
  }

  // active tab
  activeTab(index) {
    this.tab = index;
  }
  // open search
  toggleSearch() {
    this.showSearch = !this.showSearch;
  }
  // active like
  activeLike(item, $event) {
    $event.stopPropagation();
    item.like = !item.like;
  }
  activeLike2(item, $event) {
    $event.stopPropagation();
    item.like2 = !item.like2;
  }
  // For Scroll
  ngAfterViewInit() {
    var length = document.getElementsByClassName("tabs").length - 1;
    this.tabsPosition = document.getElementsByClassName("tabs")[length];
  }
}