import { Component, Input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'beer-summary',
  imports: [
    MatGridListModule,
    MatListModule,
  ],
  templateUrl: './beer-summary.html',
  styles: ``,
})
export class BeerSummary {
  @Input() data: any;
}
