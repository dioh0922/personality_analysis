import { Component, OnInit, signal, NgZone } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { BeerSummary } from './beer-summary/beer-summary';
import { BeerRank } from './beer-rank/beer-rank';
import { BeerGraph } from './beer-graph/beer-graph';
import { Database, ref, onValue } from '@angular/fire/database';


@Component({
  selector: 'app-beer',
  imports: [MatTabsModule, BeerSummary, BeerRank, BeerGraph],
  templateUrl: './beer.html',
  styleUrl: './beer.css',
})
export class Beer implements OnInit {
  protected data = signal<any>(null);

  constructor(
    private db: Database,
    private ngZone: NgZone
  ) {
  }

  ngOnInit() {
    const dbRef = ref(this.db, '/beer');

    onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      this.ngZone.run(() => {
        this.data.set(val);
      });
    });
  }
}
