import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database-service';
import { JsonService } from '../../services/json-service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'dump-discussion',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './dump-discussion.html',
  styleUrl: './dump-discussion.css',
})
export class DumpDiscussion {

  constructor(
    private databaseService: DatabaseService,
    private jsonService: JsonService
  ) {
  }

  dumpData = () => {
    this.databaseService.loadDiscussion().then((res) => {
      this.jsonService.downloadJson(res, 'discussion-data.json');
    });
  }
}
