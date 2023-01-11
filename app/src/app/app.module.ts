import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductsComponent } from './pages/products/products.component';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { NavService } from './services/nav.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent,
    HeaderComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    CartComponent
  ], 
  providers: [NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
