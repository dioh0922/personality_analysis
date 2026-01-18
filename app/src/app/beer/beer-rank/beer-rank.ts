import { Component, Input } from '@angular/core';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { environment } from '../../../environments/environment';
import { MatListModule } from '@angular/material/list';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'beer-rank',
  imports: [DragDropModule, MatListModule],
  templateUrl: './beer-rank.html',
  styles: ``,
})
export class BeerRank {
  protected formattedData: { id: number; label: string }[] = [];
  protected isEdit = false;

  updateOrder = () => {
    const app = getApps().length === 0 ? initializeApp(environment.firebase) : getApp();
    const db = getDatabase(app);
    const data = this.formattedData.map((item, index) => {
      // 画面表示用の順位を更新
      item.id = index + 1;
      // DB保存用データを作成（idは0始まり）
      return { id: index, label: item.label };
    });

    const rankDbRef = ref(db, '/beer/ranking');

    set(rankDbRef, data);
  }

  drop(event: CdkDragDrop<string[]>) {
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
