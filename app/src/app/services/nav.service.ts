import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NavService {

  private show$ = new BehaviorSubject<boolean>(false);
  isShow$ = this.show$.asObservable();
  constructor() {}

  toggleSide(show: boolean) {
    this.show$.next(show);
  }
}