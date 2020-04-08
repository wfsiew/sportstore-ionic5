import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router,
    private msService: MessageService
  ) { }

  ngOnInit() {}

  onMenu(i) {
    if (i === 0) {
      this.msService.send('menu:category', { category: 0 });
    }

    else {
      this.msService.send('menu:category', { category: 1 });
      this.router.navigate(['/category']);
    }
  }
}
