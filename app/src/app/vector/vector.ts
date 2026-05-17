import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api-service';
import { UmapService } from '../services/umap-service';
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
import AnnotationPlugin from 'chartjs-plugin-annotation';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  ScatterController,
  AnnotationPlugin
);

@Component({
  selector: 'app-vector',
  imports: [CommonModule, FormsModule],
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
  protected area: any = {
    disp: false,
    x: 0,
    y: 0,
    text: '',
    send: async() => {
      if(this.area.text === ''){
        return ;
      }

      const inputEmbedding = await this.apiService.convertVector(this.area.text);
      const neighborPoints = this.umapService.findNeighbor(this.plotData, inputEmbedding)
      const [centerX, centerY] = this.umapService.calcCenter(neighborPoints);


      this.area.disp = true;
      this.area.x = centerX;
      this.area.y = centerY;
      if(!this.chart || !this.chart.options.plugins){
        return;
      }
      this.chart.options.plugins.annotation = {
        annotations: {
          similarityRange:{
            type: 'ellipse',
            display: this.area.disp || false,
            xMin: this.area.x - 0.6,
            xMax: this.area.x + 0.6,
            yMin: this.area.y - 0.6,
            yMax: this.area.y + 0.6,
            backgroundColor: 'rgba(239, 68, 68, 0.15)', // 薄い赤の塗りつぶし
            borderColor: 'rgba(239, 68, 68, 0.5)',     // 赤い枠線
            borderWidth: 2,
            borderDash: [5, 5], // 点線
            label: {
              display: true,
              content: '類似性範囲',
              color: '#fff',
              font: { size: 10 }
            }
          }
        }
      }
      this.updateChart();
    }
  };

  constructor(
    private apiService: ApiService,
    private umapService: UmapService
  ) {
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
        embeddings: item.embedding
      }
    });

    this.embData = this.umapService.fitData(embeddings.map((e: any) => e.embeddings));
    const plotData = meta?.data.map((m: any, index: number) => {
      return {
        id: m.id,
        name: m.projectName,
        description: m.description,
        x: this.embData[index][0],
        y: this.embData[index][1],
        rawVector: embeddings.find((e: any) => e.id === m.id)?.embeddings || []
      }
    });
    this.plotData = plotData;
    this.updateChart();
  }
}
