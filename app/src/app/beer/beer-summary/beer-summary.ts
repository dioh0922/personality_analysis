import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'beer-summary',
  imports: [
    MatCardModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './beer-summary.html',
  styleUrl: './beer-summary.css',
})
export class BeerSummary {
  @Input() data: any;
}
