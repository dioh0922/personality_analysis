import { Component, OnInit, signal, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { BeerSummary } from './beer-summary/beer-summary';
import { BeerRank } from './beer-rank/beer-rank';
import { BeerGraph } from './beer-graph/beer-graph';
import { DatabaseService } from '../services/database-service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-beer',
  imports: [MatTabsModule, BeerSummary, BeerRank, BeerGraph],
  templateUrl: './beer.html',
  styleUrl: './beer.css',
})
export class Beer implements OnInit {
  protected data = signal<any>(null);
  protected readonly themeService = inject(ThemeService);

  constructor(
    private databaseService: DatabaseService
  ) {
  }

  ngOnInit() {
    this.databaseService.loadBeer().then((res) => {
      this.data.set(res);
    });
  }
}
