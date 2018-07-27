import { Component, Renderer, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AdsProvider } from '../../providers/ads/ads';


@IonicPage()
@Component({
  selector: 'page-my-ads',
  templateUrl: 'my-ads.html',
})

export class MyAdsPage {

  items = [];
  page = 1;
  showSearch: any;
  tab = 1;
  tabsPosition: any;
  searchQuery;
  darkHeader: any;
  user;
  localstorageString;
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer, public zone: NgZone, public adsProvider: AdsProvider) {
    if (localStorage.getItem('loginToken')) {
      this.localstorageString = localStorage.getItem('loginToken');
      this.user = JSON.parse(this.localstorageString);
    }
    this.loadAds();
  }
  loadAds(infiniteScroll?) {
    this.adsProvider.getMyAds(this.page, this.user.user_email).subscribe((data: any) => {
      this.items = this.items.concat(data);
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
  scrollingFun(ev) {
    ev.domWrite(() => {
      this.updateHeader(ev);
    });
  }

  updateHeader(ev) {
    if (ev.scrollTop > 0) {
      this.darkHeader = ev.scrollTop / 200;
      this.renderer.setElementClass(this.tabsPosition, 'sub-header', true);
    } else this.renderer.setElementClass(this.tabsPosition, 'sub-header', false);
  }

}