import { Component, signal, OnInit, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { SakeSummary } from './sake-summary/sake-summary';
import { DatabaseService } from '../services/database-service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-sake',
  imports: [MatTabsModule, SakeSummary],
  templateUrl: './sake.html',
  styleUrl: './sake.css',
})
export class Sake implements OnInit {
  protected data = signal<any>(null);
  protected readonly themeService = inject(ThemeService);

  constructor(
    private databaseService: DatabaseService
  ) {
  }

  ngOnInit() {
    this.databaseService.loadSake().then((res: any) => {
      this.data.set(res);
    });
  }
}
