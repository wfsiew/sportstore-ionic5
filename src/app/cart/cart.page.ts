import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { MessageService } from 'src/app/services/message.service';
import { StorageService } from 'src/app/services/storage.service';
import { QuantityInput } from './quantity-input/models';
import { Utils } from 'src/app/shared/helpers/utils';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  lines = [];
  cart_summary: any = {};

  constructor(
    private router: Router,
    private loc: Location,
    private alertCtrl: AlertController,
    private msService: MessageService,
    private storageService: StorageService
  ) {
    this.msService.get().subscribe((res: any) => {
      if (res.name === 'cart:updated') {
        this.load().then(() => {});
      }
    });
  }

  ngOnInit() {
    this.load().then(() => {});
  }

  async load() {
    this.lines = await this.storageService.getLines();
    this.cart_summary = await this.storageService.getCartSummary(this.lines);
  }

  async onChangeQty(o: QuantityInput) {
    await this.storageService.updateItem(o.productID, o.quantity);
    await this.load();
  }

  async onRemoveCart(o) {
    await this.storageService.removeItem(o.product);
    await this.load();
  }

  onCheckout() {
    this.router.navigate(['/checkout']);
  }

  onContinue() {
    this.loc.back();
  }
}
