import { Component, Input } from '@angular/core';

@Component({
  selector: 'beer-summary',
  imports: [],
  templateUrl: './beer-summary.html',
  styles: ``,
})
export class BeerSummary {
  @Input() data: any;
}
