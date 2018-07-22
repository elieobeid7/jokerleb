import { Component, Renderer, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AdsProvider } from '../../providers/ads/ads';


@IonicPage()
@Component({
  selector: 'page-search-details',
  templateUrl: 'search-details.html',
})

export class SearchDetailsPage {

  items = [];
  page = 1;
  category: Array<any>;
  showSearch: any;
  tab = 1;
  tabsPosition: any;
  searchQuery;
  darkHeader: any;
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer, public zone: NgZone, public adsProvider: AdsProvider) {

    this.searchQuery = this.navParams.get('searchQuery');
    console.log(this.searchQuery);

    this.category = [{ img: 'assets/img/img1.png' }, { img: 'assets/img/img2.png' }, { img: 'assets/img/img3.png' }, { img: 'assets/img/img4.png' }, { img: 'assets/img/img1.png' }, { img: 'assets/img/img2.png' }, { img: 'assets/img/img3.png' }, { img: 'assets/img/img4.png' }];
    this.loadAds();
  }

  loadAds(infiniteScroll?) {
    this.adsProvider.searchAds(this.searchQuery, this.page).subscribe((data: any) => {
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