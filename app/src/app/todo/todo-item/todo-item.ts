import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'todo-item',
  imports: [MatCardModule, MatChipsModule],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {
  @Input() priority: number = 0;
  @Input() reason: string = "";
  @Input() title: string = "";

}
