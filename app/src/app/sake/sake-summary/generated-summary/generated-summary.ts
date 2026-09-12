import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'sake-generated-summary',
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule],
  templateUrl: './generated-summary.html',
  styleUrl: './generated-summary.css',
})
export class GeneratedSummary {
  @Input() data: any = null;

  get result() {
    return this.data?.result ?? this.data;
  }

  isArray(val: any): boolean {
    return Array.isArray(val);
  }

  isObject(val: any): boolean {
    return val !== null && typeof val === 'object' && !Array.isArray(val);
  }
}

