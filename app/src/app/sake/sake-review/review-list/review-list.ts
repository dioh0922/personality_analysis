import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sake-review-list',
  imports: [],
  templateUrl: './review-list.html',
  styleUrl: './review-list.css',
})
export class ReviewList {
  @Input() reviews: any[] = [];
  @Output() deleteEvent = new EventEmitter<number>();
  delete = (id: number) => {
    this.deleteEvent.emit(id)
  }
  /*
embedding_text
:
"水芭蕉 翠は、透明感、清涼感、華やかな香り、軽やかな甘みが理想に非常に近く、最も高評価となった。"
id
:
1
reason_summary
:
"理想に最も近い"
retrieval_keywords
:
"[\"透明感\",\"清涼感\",\"華やか\",\"軽やか\"]"
sake_name
:
"水芭蕉 翠"
score
:
10
sentiment
:
"best"
tags
:
"[\"clean\",\"refreshing\",\"aromatic\",\"light_sweetness\",\"smooth\"]"
type
:
"tasting_review"
  */
}
