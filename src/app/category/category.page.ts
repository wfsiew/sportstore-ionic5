import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  list = [];

  constructor(
    private loc: Location,
    private productService: ProductService,
    private msService: MessageService
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.productService.getCategories().subscribe((res: any) => {
      this.list = res;
    });
  }

  onSelect(o) {
    this.msService.send('menu:category-selected', { category: o });
    this.loc.back();
  }
}
