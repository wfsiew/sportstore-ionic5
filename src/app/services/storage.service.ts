import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import _ from 'lodash';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  readonly baseurl = environment.baseUrl;
  readonly url = `${this.baseurl}/api/order`;

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }

  async getLines() {
    let ls = [];
    let lx = await this.storage.get('carts');
    if (_.isNull(lx)) {
      return ls;
    }

    return lx;
  }

  async addItem(product, quantity: number) {
    let lines = await this.getLines();
    let line = _.find(lines, (x) => {
      return x.product.productID === product.productID;
    });

    if (_.isUndefined(line)) {
      let o = {
        product: product,
        quantity: quantity
      };
      lines.push(o);
    }

    else {
      line.quantity += quantity;
    }

    await this.saveCart(lines);
  }

  async saveCart(lines) {
    if (_.isEmpty(lines)) {
      await this.storage.remove('carts');
    }

    else {
      await this.storage.set('carts', lines);
    }
  }

  async removeItem(product) {
    let lines = await this.getLines();
    let lx = _.reject(lines, (x) => {
      return x.product.productID === product.productID;
    });
    await this.saveCart(lx);
  }

  async updateItem(productID, quantity: number) {
    let lines = await this.getLines();
    let line = _.find(lines, (x) => {
      return x.product.productID === productID;
    });

    if (!_.isUndefined(line)) {
      if (quantity < 1) {
        let lx = _.reject(lines, (x) => {
          return x.product.productID === productID;
        });
        await this.saveCart(lx);
      }

      else {
        line.quantity = quantity;
        await this.saveCart(lines);
      }
    }
  }

  async getCartSummary(lines) {
    let qty = 0;
    let total = 0;

    _.each(lines, (x) => {
      qty += x.quantity;
      total += x.product.price * x.quantity;
    });

    return {
      totalQuantity: qty,
      totalPrice: total
    };
  }

  checkout(fm) {
    return this.http.post(`${this.url}/checkout`, fm);
  }

  async clear() {
    await this.saveCart([]);
  }
}
