import { Injectable } from '@angular/core';
import { ENV } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable()
export class AdsProvider {
  api_url = ENV.site_url + ENV.ads_url;
  ads_thumb_url = ENV.site_url + ENV.ads_thumb_url;

  constructor(public http: HttpClient) {

  }

  getAds(page, infiniteScroll) {
    return this.http.get(this.api_url + page);
  }
  getAdsDetails(id) {
    return this.http.get(this.api_url + id);
  }

  getAdsThumb(id) {
    return this.http.get(this.ads_thumb_url + id);
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
    console.log(data);

    let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
    console.log(token);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.api_url, data, { headers: headers });
  }

}