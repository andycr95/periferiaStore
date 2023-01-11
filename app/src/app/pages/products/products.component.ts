import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {

  public products: any[] = [];
  private user: any;
  public selectedProducts: any[] = [];
  public showToast: boolean = false;
  public amount: number = 0;
  constructor(private productService: ProductsService,
    public router: Router) { }

  ngOnInit(): void {
    this.getProducts();
    this.getUser();
  }

  async getUser(){
    let user = localStorage.getItem('user') || '';
    if (!user) {
      this.router.navigateByUrl('/');
    }
    this.user = JSON.parse(user);
  }

  getProducts() {
    this.productService.getProducts().subscribe( (res:any) => {
      this.products = res.data;
    }
    , (err) => {
      console.warn(err);
    }
    );
  }

  addProduct(product: any) {
    if (this.amount + product.price > this.user.limit) {
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
      return;
    }
    this.selectedProducts.push(product);
    this.amount += product.price;
  }

  onRemovedProduct(product: any) {
    const index = this.selectedProducts.findIndex( (p) => p.id === product.id);
    this.selectedProducts.splice(index, 1);
    this.amount -= product.price;
  }


}
