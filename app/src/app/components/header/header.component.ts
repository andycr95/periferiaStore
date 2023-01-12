import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { faCartPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NavService } from "../../services/nav.service";
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {


  faCartPlus = faCartPlus;
  faSearch = faSearch;
  @Input() productLength: number = 0;
  @Output() openModal = new EventEmitter<any>();
  constructor(private navService: NavService, private productService: ProductsService) { }

  ngOnInit(): void {
  }

  openNav() {
    this.navService.toggleSide(true);
  }


  open() {
    console.log('open');
    
    this.openModal.emit(true);
  }
}
