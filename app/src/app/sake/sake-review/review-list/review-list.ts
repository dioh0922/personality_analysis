import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'sake-review-list',
  imports: [MatButtonModule],
  templateUrl: './review-list.html',
  styleUrl: './review-list.css',
})
export class ReviewList {
  @Input() reviews: any[] = [];
  @Output() deleteEvent = new EventEmitter<number>();
  delete = (id: number) => {
    this.deleteEvent.emit(id)
  }
}
