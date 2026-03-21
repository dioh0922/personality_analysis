import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'judge-summary',
  imports: [
    MatCardModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './judge.html',
  styleUrl: './judge.css',
})
export class Judge {
  @Input() agree: boolean | null = null;
  @Input() summary: string[] | string | null = null;
  @Input() appendClass: string = "card";

  get summaryList(): string[] {
    if (!this.summary) return [];
    return Array.isArray(this.summary) ? this.summary : [this.summary];
  }
}
