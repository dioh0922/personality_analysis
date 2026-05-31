import { Component, signal, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { SakeSummary } from './sake-summary/sake-summary';
import { SakeVector } from './sake-vector/sake-vector';
import { DatabaseService } from '../services/database-service';
@Component({
  selector: 'app-sake',
  imports: [MatTabsModule, SakeSummary, SakeVector],
  templateUrl: './sake.html',
  styleUrl: './sake.css',
})
export class Sake implements OnInit {
  protected data = signal<any>(null);
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
