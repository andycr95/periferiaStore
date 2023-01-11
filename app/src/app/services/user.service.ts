import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor( 
    private http: HttpClient         
  ) { }

  login( formData: any ) {
    return this.http.post(`${ base_url }/users/login`, formData );
  }
}
