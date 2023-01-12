import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
declare var window: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {

  public products: any[] = [];
  public productsSearched: any[] = [];
  public user: any;
  public search: string = '';
  public selectedProducts: any[] = [];
  public showToast: boolean = false;
  formModal: any;
  public showToastSuccess: boolean = false;
  public message: string = 'No puedes comprar más de tu límite';
  public amount: number = 0;
  constructor(private productService: ProductsService,
    public router: Router) { }

  ngOnInit(): void {
    this.getProducts();
    this.getUser();

    this.formModal = new window.bootstrap.Modal(
      document.getElementById('searchModal')
    );
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

  searchProducts() {
    this.productService.searchProducts(this.search).subscribe( (res:any) => {
      this.productsSearched = res.data;
    }
    , (err) => {
      console.warn(err);
    }
    );
  }

  open() {
    this.formModal.show();
  }

  close() {
    this.formModal.hide();
  }
  

  onSubmitSale() {
    const sale = {
      user: this.user,
      products: this.selectedProducts,
      total: this.amount
    }
    this.productService.saleProduct(sale).subscribe( (res:any) => {
      this.selectedProducts = [];
      this.amount = 0;
      this.showToastSuccess = true;
      this.message = 'Compra realizada con éxito';
      this.showToast = true;
      console.log(res);
      
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(res.data.user));
      this.user = res.data.user;
      setTimeout(() => {
        this.showToast = false;
        this.showToastSuccess = false;
        this.message = 'No puedes comprar más de tu límite';
      }, 3000);
    });
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
