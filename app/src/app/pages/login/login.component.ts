import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  public loginForm = this.lf.group({
    email   : ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required]]
  });

  constructor(
    private lf: FormBuilder,
    public router: Router,
    private userService: UserService
  ) { } 

  login() {
    if (!this.loginForm.invalid) {
      this.userService.login(this.loginForm.value)
         .subscribe((res: any)  => {          
          localStorage.setItem('user', JSON.stringify(res.data));
           this.router.navigateByUrl('/home');
         }, ( err ) => {
           console.warn( err );
         })
    } else {
      console.log('Formulario no válido');
    }
    
 }  


}
