import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuantityInput } from './models';

@Component({
  selector: 'app-quantity-input',
  templateUrl: './quantity-input.component.html',
  styleUrls: ['./quantity-input.component.scss'],
})
export class QuantityInputComponent implements OnInit {

  @Input() quantity: number;
  @Input() productID: number;
  @Output() changeqty = new EventEmitter<QuantityInput>();

  constructor() { }

  ngOnInit() {}

  onAdd() {
    this.quantity = this.quantity + 1;
    this.changeqty.emit({ productID: this.productID, quantity: this.quantity });
  }

  onMinus() {
    if (this.quantity > 0) {
      this.quantity = this.quantity - 1;
      this.changeqty.emit({ productID: this.productID, quantity: this.quantity });
    }
  }
}
