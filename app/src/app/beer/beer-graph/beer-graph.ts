import { Component, AfterViewInit, OnChanges, SimpleChanges, Input, ViewChild, ElementRef } from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';
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
  selector: 'beer-graph',
  imports: [MatIconModule],
  templateUrl: './beer-graph.html',
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 400px;
    }
    .carousel {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      width: 100%;
      height: 350px;
    }

    .page {
      flex: 0 0 100%;
      scroll-snap-align: start;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    canvas {
      border: 1px solid #ccc;
    }
    .nav-bar {
      display: flex;
      width: 100%;
      height: 80px;   /* 好きな高さ */
    }

    .nav-btn {
      flex: 1;        /* ←左右均等分割のキモ */
      border-radius: 0;
      font-size: 20px;
    }
  `]
})
export class BeerGraph implements AfterViewInit, OnChanges {
  context!: CanvasRenderingContext2D;
  chart: Chart | undefined;
  tendencyContext!: CanvasRenderingContext2D;
  tendencyChart: Chart | undefined;
  index = 0;
  total = 2;
  @ViewChild('container') container!: ElementRef;
  @ViewChild('graphCanvas') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('tendencyCanvas') tendencyCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() hist: any;
  @Input() tendency: any;

  ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext('2d')!;
    this.chart = new Chart(this.context, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Intensity',
          data: [],
          fill: true,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
    this.updateChart();

    this.tendencyContext = this.tendencyCanvas.nativeElement.getContext('2d')!;

    this.tendencyChart = new Chart(this.tendencyContext, {
      type: 'scatter',
      data: {
        datasets: [{
          label: '',
          data: [
          ],
          pointRadius: 6
        }]
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: { display: true, text: 'X軸' }
          },
          y: {
            title: { display: true, text: 'Y軸' }
          }
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['hist']) {
      this.updateChart();
    }
    if(changes['tendency']){
      this.updateTendency();
    }
  }

  scrollTo(i: number) {
    const el = this.container.nativeElement;
    el.scrollTo({
      left: el.clientWidth * i,
      behavior: 'smooth'
    });
    this.index = i;
  }

  next() {
    if (this.index < this.total - 1) {
      this.scrollTo(this.index + 1);
    }
  }

  prev() {
    if (this.index > 0) {
      this.scrollTo(this.index - 1);
    }
  }

  private updateChart() {
    if (this.chart && Array.isArray(this.hist)) {
      this.chart.data.labels = this.hist.map((d: any) => d.t);
      this.chart.data.datasets[0].data = this.hist.map((d: any) => d.intensity);
      this.chart.update();
    }
  }
  private updateTendency(){
    const data = this.tendency?.plottable_elements.map((item: any) => {return{x:item.x, y:item.y}});
    if (this.tendencyChart && Array.isArray(this.tendency?.plottable_elements)) {
      const points = this.tendency?.plottable_elements.map((item: any) => ({
        x: item.x,
        y: item.y,
        label: item.description
      })) ?? [];
      this.tendencyChart.options.plugins = {
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const p = ctx.raw as any;
              return `${p.label}`;
            }
          }
        }
      };

    this.tendencyChart.data.datasets[0].data = points;

    const max = Math.max(
      ...points.map((p: any) => Math.abs(p.x)),
      ...points.map((p: any) => Math.abs(p.y)),
      1 // 0除け（全部0の時）
    ) + 10;

    if(this.tendencyChart.options.scales){
      this.tendencyChart.options.scales = {
        x: { min: -max, max: max },
        y: { min: -max, max: max }
      };
    }

    // 再描画
    this.tendencyChart.update();
    }
  }
}
