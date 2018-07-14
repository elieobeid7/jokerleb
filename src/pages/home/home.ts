import { Component, Renderer, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AdsProvider } from '../../providers/ads/ads';
import { ENV } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

  media = [];
  ads = [];
  items = [];
  media_id;
  page = 1;
  category: Array<any>;
  showSearch: any;
  tab = 1;
  tabsPosition: any;
  darkHeader: any;
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer, public zone: NgZone, public adsProvider: AdsProvider, private HttpClient: HttpClient) {


    this.category = [{ img: 'assets/img/img1.png' }, { img: 'assets/img/img2.png' }, { img: 'assets/img/img3.png' }, { img: 'assets/img/img4.png' }, { img: 'assets/img/img1.png' }, { img: 'assets/img/img2.png' }, { img: 'assets/img/img3.png' }, { img: 'assets/img/img4.png' }];
    this.loadAds();





  }

  loadAds(infiniteScroll?) {
    this.HttpClient.get(ENV.site_url + ENV.ads_url + this.page)
      .subscribe(res => {
        this.items = this.items.concat(res);

        if (infiniteScroll) {
          infiniteScroll.complete();
        }
        /*       this.HttpClient.get(ENV.site_url + ENV.ads_thumb_url + this.ads)
                .subscribe(res => {
                  this.media = this.media.concat(res);
                  this.items = this.ads.concat(this.media);
                  console.log(this.items);
                }) */

      }
      )



  }



  /*   getAds().subscribe(data => {
  
      this.items = this.items.concat(data['results']);
  
  
    }) */
  loadMore(infiniteScroll) {
    this.page++;
    this.loadAds(infiniteScroll);

  }
  onShowItemDetail(item) {
    this.navCtrl.push('SecDetailsPage', { item: item });
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