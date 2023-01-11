import { Component, OnInit, Input } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { NavService } from "../../services/nav.service";
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {


  faCartPlus = faCartPlus;
  @Input() productLength: number = 0;
  constructor(private navService: NavService, private productService: ProductsService) { }

  ngOnInit(): void {
  }

  openNav() {
    this.navService.toggleSide(true);
  }

}
