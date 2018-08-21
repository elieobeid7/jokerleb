import { Injectable } from '@angular/core';
import { ENV } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/Storage';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AdsProvider {
  api_url = ENV.site_url + ENV.ads_url;
  ads_thumb_url = ENV.site_url + ENV.ads_thumb_url;
  token: any;
  categories_url = ENV.categories_url;


  constructor(public http: HttpClient, public storage: Storage) {

  }
  getAds(page): Observable<any[]> {
    return this.http.get(this.api_url + page)
      .flatMap((ads: any[]) => {
        if (ads.length > 0) {
          return Observable.forkJoin(
            ads.map((ad: any) => {
              return this.http.get(this.ads_thumb_url + ad.id)
                .map((res: any) => {
                  let media: any = res;
                  ad.media = media;
                  return ad;
                });
            })
          );
        }
        return Observable.of([]);
      });
  }

  getMyAds(page, email): Observable<any[]> {
    return this.http.get(this.api_url + page)
      .flatMap((ads: any[]) => {
        if (ads.length > 0) {
          console.log(ads);
          return Observable.forkJoin(
            ads.filter((ad: any) => ad.email.trim().toLowerCase() === email.trim().toLowerCase()).map((ad) => {
              return this.http.get(this.ads_thumb_url + ad.id)
                .map((res: any) => {
                  let media: any = res;
                  ad.media = media;
                  return ad;
                });
            })
          );
        }
        return Observable.of([]);
      });
  }

  getCategory(slug, page): Observable<any[]> {
    return this.http.get(this.api_url + "&&per_page=20&&page=" + page)
      .flatMap((ads: any[]) => {
        if (ads.length > 0) {
          return Observable.forkJoin(
            ads.filter((ad: any) => ad.pure_taxonomies.ad_cat["0"].slug.trim().toLowerCase() === slug.trim().toLowerCase()).map((ad) => {
              return this.http.get(this.ads_thumb_url + ad.id)
                .map((res: any) => {
                  let media: any = res;
                  ad.media = media;
                  return ad;
                });
            })
          );
        }
        return Observable.of([]);
      });
  }




  getCategoris() {
    return this.http.get(this.categories_url);
  }

  searchAds(term, page): Observable<any[]> {
    return this.http.get(ENV.site_url + ENV.ads_search_url + term + "&&per_page=20&&page=" + page)
      .flatMap((ads: any[]) => {
        if (ads.length > 0) {
          return Observable.forkJoin(
            ads.map((ad: any) => {
              return this.http.get(this.ads_thumb_url + ad.id)
                .map((res: any) => {
                  let media: any = res;
                  ad.media = media;
                  return ad;
                });
            })
          );
        }
        return Observable.of([]);
      });
  }


  postAds(content, author) {
    let data = {
      title: content,
      content: content,
      price: content,
      phone_number: content,
      email: content,
      city: content,
      country: content,
      writer: author,
      status: 'publish'
    };
    this.storage.get('loginToken').then((val) => {
      this.token = val.token;
    });

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(this.api_url, data, { headers: headers });
  }

}