import { Component, signal, effect } from '@angular/core';
import { DatabaseService } from '../../services/database-service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'dump-beer',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './dump-beer.html',
  styleUrl: './dump-beer.css',
})
export class DumpBeer {
  protected data = signal<any>(null);
  private shouldDownload = signal(false);

  constructor(
    private databaseService: DatabaseService
  ) {
    effect(() => {
      if (this.shouldDownload() && this.data() !== null) {
        this.downloadJson(this.data());
        this.shouldDownload.set(false);
      }
    });
  }

  dumpData = () => {
    this.shouldDownload.set(true);
    this.data = this.databaseService.loadData();
  }

  private downloadJson(data: any) {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'beer-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
