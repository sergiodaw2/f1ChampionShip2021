import { Observable, BehaviorSubject } from 'rxjs';

export class SharingService {
       private data = new BehaviorSubject("")
       currentData = this.data.asObservable();

 constructor() { }

 setData(data) {
   console.log("setting Data");

      this.data.next(data);
 }
}
