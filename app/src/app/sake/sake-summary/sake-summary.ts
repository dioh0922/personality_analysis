import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'sake-summary',
  imports: [MatCardModule, MatListModule, MatIconModule],
  templateUrl: './sake-summary.html',
  styleUrl: './sake-summary.css',
})
export class SakeSummary {
  @Input() data: any = null;
}
