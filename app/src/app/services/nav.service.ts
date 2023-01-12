import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NavService {

  private show$ = new BehaviorSubject<boolean>(false);
  isShow$ = this.show$.asObservable();

  private showModal$ = new BehaviorSubject<boolean>(false);
  isShowModal$ = this.showModal$.asObservable();
  constructor() {}

  toggleSide(show: boolean) {
    this.show$.next(show);
  }

  toggleModal(show: boolean) {
    this.showModal$.next(show);
  }

}