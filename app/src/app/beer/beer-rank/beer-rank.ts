import { Component, Input } from '@angular/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DatabaseService } from '../../services/database-service';

@Component({
  selector: 'beer-rank',
  imports: [
    DragDropModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule
  ],
  templateUrl: './beer-rank.html',
  styles: `
    .list-container {
      display: flex;
      flex-direction: column;
      height: 75vh;
    }
    .fixed-row {
      flex-shrink: 0;
      background: white;
      z-index: 2;
      border-bottom: 1px solid #ddd;
    }
    .scroll-area {
      flex: 1;
      overflow-y: auto;
    }
  `,
})
export class BeerRank {
  protected formattedData: { id: number; label: string }[] = [];
  protected isEdit = false;

  constructor(
    private databaseService: DatabaseService,
    private snackBar: MatSnackBar
  ) {
  }

  updateOrder = async () => {
    const data = this.formattedData.map((item, index) => {
      // 画面表示用の順位を更新
      item.id = index + 1;
      // DB保存用データを作成（idは0始まり）
      return { id: index, label: item.label };
    });

    this.isEdit = false;
    await this.databaseService.updateRankOrder(data);
    this.snackBar.open('update success', 'close');
  }

  drop = (event: CdkDragDrop<string[]>) => {
    this.isEdit = true;
    moveItemInArray(this.formattedData, event.previousIndex, event.currentIndex);
  }

  @Input()
  set rankData(value: any) {
    if (Array.isArray(value)) {
      this.formattedData = value.filter(item => item).map((item, index) => {
        return { id: index + 1, label: item.label };
      });
    } else {
      this.formattedData = [];
    }
  }
}
