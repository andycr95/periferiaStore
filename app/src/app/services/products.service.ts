import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( 
    private http: HttpClient         
  ) { }

  getProducts() {
    return this.http.get(`${ base_url }/products` );
  }

}
