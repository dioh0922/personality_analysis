
import { Injectable, NgZone, signal } from '@angular/core';
import { Database, ref, onValue } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  protected data = signal<any>(null);
  constructor(
    private db: Database,
    private ngZone: NgZone
  ) {
  }
  loadData(){
    const dbRef = ref(this.db, '/beer');

    onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      this.ngZone.run(() => {
        this.data.set(val);
      });
    });
    return this.data;
  }
}
