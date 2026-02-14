import { Component, Input } from '@angular/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DatabaseService } from '../../services/database-service';
import { AddRankDialog } from './add-rank-dialog/add-rank-dialog';

@Component({
  selector: 'beer-rank',
  imports: [
    DragDropModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule
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
    private snackBar: MatSnackBar,
    private dialog: MatDialog
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

  deleteItem = (item: any) => {
    this.formattedData.splice(item.id - 1, 1);
    this.reorderData();
    this.isEdit = true;
  }

  openDialog = (item: any) => {
    const dialogRef = this.dialog.open(AddRankDialog, {
      data: item?.id  + 1
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        // 挿入位置を計算 (idは1始まりのため -1)
        const insertIndex = result.id - 1;

        this.formattedData.splice(insertIndex, 0, { id: result.id, label: result.label });
        this.reorderData();
        this.isEdit = true;
      }
    });
  }

  private reorderData = () => {
    // IDを再採番して整合性を保つ
    this.formattedData.forEach((item, index) => {
      item.id = index + 1;
    });
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
