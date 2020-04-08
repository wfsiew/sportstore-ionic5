import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { IonInfiniteScroll, IonVirtualScroll, PopoverController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { MessageService } from 'src/app/services/message.service';
import { StorageService } from 'src/app/services/storage.service';
import _ from 'lodash';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  list = [];
  page: number = 1;
  category: string;
  pmenu = null;

  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll, { static: false }) virtualScroll: IonVirtualScroll;

  constructor(
    private router: Router,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private productService: ProductService,
    private msService: MessageService,
    private storageService: StorageService
  ) {
    this.msService.get().subscribe((res: any) => {
      if (res.name === 'menu:category') {
        if (this.pmenu) {
          this.pmenu.dismiss().then(() => { this.pmenu = null; });
        }

        let i = res.data.category;
        if (i === 0) {
          this.category = null;
          this.refresh(null);
        }
      }

      else if (res.name === 'menu:category-selected') {
        this.category = res.data.category;
        this.refresh(null);
      }
    });
  }

  ngOnInit() {
    this.load(null);
  }

  load(event) {
    this.productService.getProducts(this.category, this.page).subscribe((res: any) => {
      let lx = res.products;
      if (!_.isEmpty(res.products)) {
        this.page = this.page + 1;
        _.each(lx, (x) => {
          this.list.push(x);
        });
      }

      if (event) {
        event.target.complete();
      }

      this.virtualScroll.checkEnd();
      this.infiniteScroll.complete();
    });
  }

  refresh(event) {
    this.page = 1;
    this.list = [];
    this.load(event);
  }

  loadMore(event) {
    this.load(null);
  }

  async onAddToCart(o) {
    await this.storageService.addItem(o, 1);
    this.msService.send('cart:updated', {});
    const toast = await this.toastCtrl.create({
      message: 'Added to cart successfully!',
      duration: 3000
    });
    toast.present();
  }

  async onMenu(ev) {
    const p = await this.popoverCtrl.create({
      component: MenuComponent,
      event: ev,
      translucent: true
    });
    this.pmenu = p;
    return await p.present();
  }
}
