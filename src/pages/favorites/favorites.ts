import { Component, Renderer, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Storage } from '@ionic/Storage';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})

export class FavoritesPage {


  items = [];
  showSearch: any;
  tab = 1;
  tabsPosition: any;
  searchQuery;
  darkHeader: any;
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer, public zone: NgZone, public storage: Storage) {
    this.storage.get("favorites").then((val) => {
      this.items = JSON.parse(val);
    });
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
  removefavorites(item) {
    this.storage.get("favorites").then((val) => {
      this.items = JSON.parse(val);
      this.items.splice(item, 1);
      this.storage.set('favorites', JSON.stringify(this.items));
    });
  }
}