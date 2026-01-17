import { Component, Input } from '@angular/core';

@Component({
  selector: 'beer-rank',
  imports: [],
  templateUrl: './beer-rank.html',
  styles: ``,
})
export class BeerRank {
  protected formattedData: { rank: number; label: string }[] = [];

  @Input()
  set rankData(value: any) {
    if (Array.isArray(value)) {
      this.formattedData = value.filter(item => item).map((item, index) => {
        return { rank: index + 1, label: item };
      });
    } else {
      this.formattedData = [];
    }
  }
}
