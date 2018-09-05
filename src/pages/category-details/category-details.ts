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
  item_category: any;

  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer, public zone: NgZone, public adsProvider: AdsProvider) {

    this.category = this.navParams.get('category');

    this.loadAds();
  }
  loadAds(infiniteScroll?) {
    this.adsProvider.getAds(this.page).subscribe((data: any) => {
      if (!this.category.main) {
        if (this.category.slug) {
          for (let i = 0; i < data.length; i++) {
            if (data[i] !== undefined) {
              if (data[i].pure_taxonomies.ad_cat[0].slug.trim().toLowerCase() === this.category.slug.trim().toLowerCase()) {
                this.item_category = data[i].pure_taxonomies.ad_cat[0].term_id;
                break;
              }

            }
          }
          if (this.item_category !== undefined) {
            for (let i = 0; i < data.length; i++) {
              if (data[i].pure_taxonomies !== undefined) {
                if (data[i].pure_taxonomies.ad_cat[0].term_id === this.item_category ||
                  data[i].pure_taxonomies.ad_cat[0].slug.trim().toLowerCase() === this.category.slug.trim().toLowerCase()) {
                  this.items.push(data[i]);
                }
              }
            }
          }
        }
      } else {
        if (this.category.main === 2) {
          for (let i = 0; i < data.length; i++) {
            if (data[i] !== undefined) {
              if (data[i].pure_taxonomies.ad_cat[0].slug.trim().toLowerCase() === this.category.slug.trim().toLowerCase()) {
                this.item_category = data[i].pure_taxonomies.ad_cat[0].parent;
                break;
              }

            }
          }
          if (this.item_category !== undefined) {
            for (let i = 0; i < data.length; i++) {
              if (data[i].pure_taxonomies !== undefined) {
                if (data[i].pure_taxonomies.ad_cat[0].parent === this.item_category) {
                  this.items.push(data[i]);
                }
              }
            }
          }
        }
      }
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