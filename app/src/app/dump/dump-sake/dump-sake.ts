import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database-service';
import { JsonService } from '../../services/json-service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'dump-sake',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './dump-sake.html',
  styleUrl: './dump-sake.css',
})
export class DumpSake {
  constructor(
    private databaseService: DatabaseService,
    private jsonService: JsonService
  ) {
  }

  dumpData = () => {
    this.databaseService.loadSake().then((res) => {
      this.jsonService.downloadJson(res, 'sake-data.json');
    });
  }

}
