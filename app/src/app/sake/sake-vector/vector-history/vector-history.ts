import { Component, OnInit, input, effect } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { VectorResultDialog } from './vector-result-dialog/vector-result-dialog';
import { environment } from '../../../../environments/environment';
import axios from 'axios';

@Component({
  selector: 'vector-history',
  standalone: true,
  imports: [
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    VectorResultDialog,
  ],
  templateUrl: './vector-history.html',
  styleUrl: './vector-history.css',
})
export class VectorHistory implements OnInit {
  protected history: any[] = [];
  protected isLoading = false;
  protected error = '';
  currentItem = input<any>();

  constructor(private dialog: MatDialog) {
    effect(() => {
      const item = this.currentItem();
      if(item){
        this.openResult(item);
      }
    })
  }

  ngOnInit() {
    this.loadHistory();
  }

  openResult(item: any) {
    const dialogRef = this.dialog.open(VectorResultDialog, {
      data: { result: item.result, prompt: item.prompt, created_at: item.created_at },
      maxWidth: '95vw',
      maxHeight: '90vh',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadHistory();
    });
  }

  loadHistory() {
    this.isLoading = true;
    this.error = '';
    axios.get(`${environment.apiBaseUrl}/ext_api/api/vector/match/list`)
      .then(res => {
        this.history = res.data;
      })
      .catch(() => { this.error = '履歴の取得に失敗しました'; })
      .finally(() => { this.isLoading = false; });
  }

}
