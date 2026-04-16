import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoItem } from './todo-item/todo-item';
import { environment } from '../../environments/environment';
import axios from 'axios';

interface TodoListItem {
  priority: number;
  reason: string;
  title:string;
}

@Component({
  selector: 'app-todo',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    CommonModule,
    FormsModule,
    TodoItem
  ],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  constructor(
    private snackBar: MatSnackBar
  ){}

  protected isLoading: boolean = false;
  protected summary: string = "";
  protected list: TodoListItem[] = [];

  listByPriority(priority: number): TodoListItem[] {
    return this.list.filter(item => item.priority === priority);
  }

  submit = () => {
    this.isLoading = true;
    axios.get(`${environment.apiBaseUrl}/extApi/aiSrc/todo.php`)
    .then((res: any) => {
      this.summary = res.data.summary;
      this.list = res.data.todo;
    }).catch((er: any) => {
      this.snackBar.open(er.message || "エラーが発生しました", "閉じる", {duration: 3000});
    }).finally(() => {
      this.isLoading = false;
    });
  }
}
