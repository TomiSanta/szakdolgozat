import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeLoadingService {

  constructor() { }

  loadingWithPromise(): Promise<number> {
    return new Promise((resolve, reject) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if ( i === 3){
          clearInterval(interval);
          resolve(i);
        }
      }, 3000);
    })
  }

  //Változás követéseket lehet ezzel megvalósítani
  loadingWithObservable(email: any, password: any): Observable<boolean> {
    return new Observable((subscriber: Subscriber<boolean>) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i === 3){
          if (email === 'test@gmail.com' && password === 'testpw') {
            subscriber.next(true);
            subscriber.complete();
          } else {
            subscriber.error(false);
          }
        }
      }, 500);
    });
  }
}
