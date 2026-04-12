import { Component, Input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'sake-summary',
  imports: [MatGridListModule, MatListModule],
  templateUrl: './sake-summary.html',
  styleUrl: './sake-summary.css',
})
export class SakeSummary {
  @Input() data: any = null;
}
