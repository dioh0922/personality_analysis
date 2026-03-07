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
          data: [],
          pointRadius: 6
        }]
      },
      plugins: [{
        id: 'groupingCircle',
        beforeDraw: (chart: any, args: any, options: any) => {
          const points = options.points;
          if (!points || points.length === 0) return;
          const ctx = chart.ctx;
          const xAxis = chart.scales['x'];
          const yAxis = chart.scales['y'];
          const xs = points.map((p: any) => p.x);
          const ys = points.map((p: any) => p.y);
          const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
          const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
          const cpx = xAxis.getPixelForValue(cx);
          const cpy = yAxis.getPixelForValue(cy);
          let maxR = 0;
          points.forEach((p: any) => {
            const dx = xAxis.getPixelForValue(p.x) - cpx;
            const dy = yAxis.getPixelForValue(p.y) - cpy;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d > maxR) maxR = d;
          });
          ctx.save();
          ctx.beginPath();
          ctx.arc(cpx, cpy, maxR + 20, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(75, 192, 192, 0.2)';
          ctx.strokeStyle = 'rgb(75, 192, 192)';
          ctx.lineWidth = 1;
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }
      }],
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
      const points = this.tendency?.plottable_elements.map((item: any) => {
        const labelParts = [item.description, ...(item.common_marketing_phrases || [])];
        return { ...item, label: labelParts.join('\n') };
      }) ?? [];
      this.tendencyChart.options.plugins = {
        tooltip: {
          filter: (tooltipItem) => tooltipItem.datasetIndex === 0,
          callbacks: {
            label: (ctx) => {
              const p = ctx.raw as any;
              return p.label.split('\n');
            }
          }
        }
      };

      const withinRange = this.tendency?.plottable_elements
        .filter((item: any) => item?.within_preference_range ?? false)
        .map((item: any) => ({
          x: item.x,
          y: item.y
        })) ?? [];

      this.tendencyChart.data.datasets[0].data = points;
      if (this.tendencyChart.options.plugins) {
        (this.tendencyChart.options.plugins as any).groupingCircle = { points: withinRange };
      }

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
