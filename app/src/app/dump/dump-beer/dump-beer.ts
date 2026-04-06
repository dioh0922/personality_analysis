import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database-service';
import { JsonService } from '../../services/json-service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'dump-beer',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './dump-beer.html',
  styleUrl: './dump-beer.css',
})
export class DumpBeer {

  constructor(
    private databaseService: DatabaseService,
    private jsonService: JsonService
  ) {
  }

  dumpData = () => {
    this.databaseService.loadBeer().then((res) => {
      this.jsonService.downloadJson(res, 'beer-data.json');
    });
  }
}
