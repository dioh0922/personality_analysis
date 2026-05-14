import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api-service';
import { UMAP } from 'umap-js';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  ScatterController,
  Filler
} from 'chart.js';
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  ScatterController
);

@Component({
  selector: 'app-vector',
  imports: [CommonModule],
  templateUrl: './vector.html',
  styleUrl: './vector.css',
})
export class Vector implements OnInit, AfterViewInit {
  @ViewChild('vectorChart') canvas!: ElementRef<HTMLCanvasElement>;
  protected chart: Chart | undefined;

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

  ngAfterViewInit() {
    this.initChart();
  }

  private initChart() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Projects',
          data: [],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          pointRadius: 6,
          pointHoverRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const p = context.raw as any;
                return `${p.name}: ${p.description}`;
              }
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          },
          y: {
            type: 'linear'
          }
        }
      }
    });
    
    if (this.plotData.length > 0) {
      this.updateChart();
    }
  }

  private updateChart() {
    if (this.chart) {
      this.chart.data.datasets[0].data = this.plotData;
      this.chart.update();
    }
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
    this.updateChart();
  }
}
