import { Component, Input } from '@angular/core';

@Component({
  selector: 'beer-rank',
  imports: [],
  templateUrl: './beer-rank.html',
  styles: ``,
})
export class BeerRank {
  @Input() rankData: any;
}
