import { Component, OnInit, signal } from '@angular/core';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { environment } from '../../environments/environment';
import { MatTabsModule } from '@angular/material/tabs';
import { BeerSummary } from './beer-summary/beer-summary';
import { BeerRank } from './beer-rank/beer-rank';

@Component({
  selector: 'app-beer',
  imports: [MatTabsModule, BeerSummary, BeerRank],
  templateUrl: './beer.html',
  styleUrl: './beer.css',
})
export class Beer implements OnInit {
  protected data = signal<any>(null);

  ngOnInit() {
    // アプリが未初期化の場合のみ初期化（二重初期化防止）
    const app = getApps().length === 0 ? initializeApp(environment.firebase) : getApp();
    const db = getDatabase(app);

    const dbRef = ref(db, '/beer');

    onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      this.data.set(val);
    });
  }
}
