
import { Injectable, NgZone, signal } from '@angular/core';
import { Database, ref, onValue, set, get, push } from '@angular/fire/database';

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

  loadBeer = (): Promise<any> => {
    const dbRef = ref(this.db, '/beer');
    return new Promise((resolve) => {
      onValue(dbRef, (snapshot) => {
        resolve(snapshot.val());
      }, { onlyOnce: true });
    });
  }

  loadData = () => {
    const dbRef = ref(this.db, '/beer');

    onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      this.ngZone.run(() => {
        this.data.set(val);
      });
    });
    return this.data;
  }

  updateRankOrder = async (data: Array<any>) => {
    const rankDbRef = ref(this.db, '/beer/ranking');
    await set(rankDbRef, data);
  }

  saveDiscussion = async (data: any) => {
    const now = new Date();

    const timestampKey =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0') +
    String(now.getHours()).padStart(2, '0') +
    String(now.getMinutes()).padStart(2, '0') +
    String(now.getSeconds()).padStart(2, '0');

    const discussionItemRef = ref(this.db, `/discussion/${timestampKey}`);
    await set(discussionItemRef, data);
  }

  loadDiscussion = (): Promise<any> => {
    const dbRef = ref(this.db, '/discussion');
    return new Promise((resolve) => {
      onValue(dbRef, (snapshot) => {
        resolve(snapshot.val());
      }, { onlyOnce: true });
    });
  }

  loadSake = (): Promise<any> => {
    const dbRef = ref(this.db, '/sake');
    return new Promise((resolve) => {
      onValue(dbRef, (snapshot) => {
        resolve(snapshot.val());
      }, { onlyOnce: true });
    });
  }

}
