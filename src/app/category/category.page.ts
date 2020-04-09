import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { MessageService } from 'src/app/services/message.service';
import { Utils } from 'src/app/shared/helpers/utils';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  list = [];

  constructor(
    private loc: Location,
    private alertCtrl: AlertController,
    private productService: ProductService,
    private msService: MessageService
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.productService.getCategories().subscribe((res: any) => {
      this.list = res;
    },
    (error) => {
      Utils.handleError(error, this.alertCtrl, this.load).then(() => {});
    });
  }

  onSelect(o) {
    this.msService.send('menu:category-selected', { category: o });
    this.loc.back();
  }
}
