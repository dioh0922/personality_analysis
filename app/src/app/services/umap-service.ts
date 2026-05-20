import { Injectable } from '@angular/core';
import { UMAP } from 'umap-js';
import * as distance from 'ml-distance';

@Injectable({
  providedIn: 'root',
})
export class UmapService {
  protected umap = new UMAP({
    nComponents: 2,
    nNeighbors: 15,
    minDist: 0.01,// 点と点の間の最低距離
  });

  fitData(data: any[]){
    return this.umap.fit(data);
  }
  transformData(data: any[]){
    return this.umap.transform(data)[0]
  }

  findNeighbor(rawArr: any[], data: any[]){
    const neighbors = rawArr.map((v: any, index: number) => ({
      index: index + 1,
      score: distance.similarity.cosine(v.rawVector, data),
      v: v,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

    return neighbors;
  }

  calcCenter(data: any[]){
    const neighborPoint = data.map((item: any) => {
      return {
        x: item.v.x,
        y: item.v.y
      }
    });
    // 各軸の合計値を計算
    const totalX = neighborPoint.reduce((sum, p) => sum + p.x, 0);
    const totalY = neighborPoint.reduce((sum, p) => sum + p.y, 0);

    // 平均を出す
    const centroidX = totalX / neighborPoint.length;
    const centroidY = totalY / neighborPoint.length;

    const topPoint = data[0];
    const topSimilarity = topPoint.score; // 例: 0.85

    const dynamicPullFactor = Math.max(0, (topSimilarity - 0.5) * 2);

    // 重心と先頭の点を内分する（線形補間）
    // 重心-先頭の距離を先頭方向に移動させる
    const centerX = centroidX + (topPoint.v.x - centroidX) * dynamicPullFactor;
    const centerY = centroidY + (topPoint.v.y - centroidY) * dynamicPullFactor;
    return [centerX, centerY];

  }
}

