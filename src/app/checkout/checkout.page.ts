import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/services/message.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  mform: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loc: Location,
    private msService: MessageService,
    private storageService: StorageService
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.mform = this.fb.group({
      name: ['', [Validators.required]],
      line1: ['', [Validators.required]],
      line2: [''],
      line3: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: [''],
      country: ['', [Validators.required]],
      giftWrap: [false]
    });
  }

  async onSubmit() {
    let m = this.mform.value;
    let order = {
      name: m.name,
      line1: m.line1,
      line2: m.line2,
      line3: m.line3,
      city: m.city,
      state: m.state,
      zip: m.zip,
      country: m.country,
      giftWrap: m.giftWrap
    };

    let lines = await this.storageService.getLines();
    let fm = {
      order: order,
      lines: lines
    };

    this.storageService.checkout(fm).subscribe((res: any) => {
      this.storageService.clear().then(() => {
        this.msService.send('cart:updated', {});
        this.loc.back();
      });
    });
  }
}
