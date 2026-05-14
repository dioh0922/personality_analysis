import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api-service';
import { UMAP } from 'umap-js';


@Component({
  selector: 'app-vector',
  imports: [CommonModule],
  templateUrl: './vector.html',
  styleUrl: './vector.css',
})
export class Vector implements OnInit {

  protected embData: any;
  protected meta: any;
  protected umap = new UMAP({
    nComponents: 2,
    nNeighbors: 15,
    minDist: 0.1,// 点と点の間の最低距離
  });
  protected plotData: any = [];

  constructor(private apiService: ApiService) {
  }

  async ngOnInit(): Promise<void> {
    const [meta, vector] = await this.apiService.callAllTechListVector();

    const embeddings = vector?.data.map((item: any) => {
      return {
        id: item.rowid,
        embeddings: item.embedding.data
      }
    });

    this.embData = this.umap.fit(embeddings.map((e: any) => e.embeddings));
    const plotData = meta?.data.map((m: any, index: number) => {
      return {
        id: m.id,
        name: m.projectName,
        description: m.description,
        x: this.embData[index][0],
        y: this.embData[index][1]
      }
    });
    this.plotData = plotData;
  }
}
