import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import _ from 'lodash';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly baseurl = environment.baseUrl;
  readonly url = `${this.baseurl}/api/product`;

  constructor(
    private http: HttpClient
  ) { }

  getCategories() {
    return this.http.get(`${this.url}/categories`);
  }

  getProducts(category: string, page: number) {
    let _url = `${this.url}/${page}`;

    if (!_.isUndefined(category) && !_.isNull(category)) {
      _url = `${this.url}/${category}/${page}`;
    }

    return this.http.get(_url);
  }
}
