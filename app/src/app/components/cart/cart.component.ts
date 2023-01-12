import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

  public show: boolean = false;
  @Input() productList: any[] = [];
  @Input() amount: number = 0;
  @Output() onRemoved = new EventEmitter<any>();
  @Output() onSubmitSale = new EventEmitter<any>();
  constructor(private navService: NavService) { }

  ngOnInit(): void {
    this.navService.isShow$.subscribe((value) => {
      this.show = value;
    });
  }

  closeNav() {
    this.navService.toggleSide(false);
  }

  submitSale() {
    this.onSubmitSale.emit();
    setTimeout(() => {
      this.closeNav();
    }, 1000);
  }

  removeProduct(product: any) {
    this.onRemoved.emit(product);
  }

}
