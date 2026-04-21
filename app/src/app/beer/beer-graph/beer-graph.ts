import { Component, AfterViewInit, OnChanges, OnDestroy, SimpleChanges, Input, ViewChild, ElementRef, inject, effect } from '@angular/core';
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
import { ThemeService } from '../../services/theme.service';

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
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .carousel {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      width: 100%;
      flex: 1;
      scrollbar-width: none;
    }
    .carousel::-webkit-scrollbar {
      display: none;
    }
    .page {
      flex: 0 0 100%;
      scroll-snap-align: start;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 12px;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }
    .page canvas {
      width: 100% !important;
      height: 100% !important;
    }
    .nav-bar {
      display: flex;
      width: 100%;
      height: 36px;
      border-top: 1px solid rgba(255,255,255,0.05);
      background: rgba(0,0,0,0.1);
    }
    .nav-btn {
      flex: 1;
      border: none;
      background: transparent;
      color: inherit;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .nav-btn:hover { background: rgba(255,255,255,0.05); }
  `]
})
export class BeerGraph implements AfterViewInit, OnChanges, OnDestroy {
  chart: Chart | undefined;
  tendencyChart: Chart | undefined;
  index = 0;
  total = 2;
  private isInitialized = false;
  private resizeObserver: ResizeObserver | undefined;
  
  protected readonly themeService = inject(ThemeService);

  @ViewChild('container') container!: ElementRef;
  @ViewChild('graphCanvas') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('tendencyCanvas') tendencyCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() hist: any;
  @Input() tendency: any;

  constructor() {
    effect(() => {
      this.themeService.theme();
      if (this.isInitialized) {
        this.refreshCharts();
      }
    });
  }

  ngAfterViewInit() {
    this.initCharts();
    this.isInitialized = true;
    this.resizeObserver = new ResizeObserver(() => {
      this.chart?.resize();
      this.tendencyChart?.resize();
    });
    this.resizeObserver.observe(this.container.nativeElement);
  }

  ngOnDestroy() {
    this.isInitialized = false;
    this.resizeObserver?.disconnect();
    this.chart?.destroy();
    this.tendencyChart?.destroy();
  }

  private refreshCharts() {
    this.chart?.destroy();
    this.tendencyChart?.destroy();
    this.initCharts();
  }

  private initCharts() {
    if (!this.canvas?.nativeElement || !this.tendencyCanvas?.nativeElement) return;

    const isDashboard = this.themeService.theme() === 'dashboard';
    const textColor = isDashboard ? '#848e9c' : '#666';
    const gridColor = isDashboard ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.1)';

    const ctx = this.canvas.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Intensity',
            data: [],
            fill: true,
            backgroundColor: isDashboard ? 'rgba(41, 98, 255, 0.1)' : 'rgba(75, 192, 192, 0.2)',
            borderColor: isDashboard ? '#2962ff' : 'rgb(75, 192, 192)',
            tension: 0.1,
            pointRadius: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { grid: { color: gridColor }, ticks: { color: textColor } },
            y: { grid: { color: gridColor }, ticks: { color: textColor } }
          },
          plugins: { legend: { display: false } }
        }
      });
      this.updateChart();
    }

    const tCtx = this.tendencyCanvas.nativeElement.getContext('2d');
    if (tCtx) {
      this.tendencyChart = new Chart(tCtx, {
        type: 'scatter',
        data: {
          datasets: [{
            label: '',
            data: [],
            pointRadius: 6,
            pointBackgroundColor: isDashboard ? '#0ecb81' : 'rgb(75, 192, 192)'
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
            if (!xAxis || !yAxis) return;
            
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
            ctx.fillStyle = isDashboard ? 'rgba(14, 203, 129, 0.1)' : 'rgba(75, 192, 192, 0.2)';
            ctx.strokeStyle = isDashboard ? '#0ecb81' : 'rgb(75, 192, 192)';
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
              grid: { color: gridColor }, 
              ticks: { color: textColor },
              type: 'linear',
              position: 'bottom'
            },
            y: { grid: { color: gridColor }, ticks: { color: textColor } }
          },
          plugins: { 
            legend: { display: false },
            tooltip: {
              enabled: true,
              callbacks: {
                label: (ctx: any) => {
                  const p = ctx.raw as any;
                  if (!p || !p.label) return '';
                  return p.label.split('\n');
                }
              }
            }
          }
        }
      });
      this.updateTendency();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['hist']) this.updateChart();
    if (changes['tendency']) this.updateTendency();
  }

  scrollTo(i: number) {
    const el = this.container.nativeElement;
    el.scrollTo({ left: el.clientWidth * i, behavior: 'smooth' });
    this.index = i;
    setTimeout(() => {
      this.chart?.resize();
      this.tendencyChart?.resize();
    }, 400);
  }

  next() { if (this.index < this.total - 1) this.scrollTo(this.index + 1); }
  prev() { if (this.index > 0) this.scrollTo(this.index - 1); }

  private updateChart() {
    if (this.chart && Array.isArray(this.hist)) {
      this.chart.data.labels = this.hist.map((d: any) => d.t);
      this.chart.data.datasets[0].data = this.hist.map((d: any) => d.intensity);
      this.chart.update();
    }
  }

  private updateTendency() {
    if (this.tendencyChart && Array.isArray(this.tendency?.plottable_elements)) {
      const points = this.tendency.plottable_elements.map((item: any) => {
        const labelParts = [item.description, ...(item.common_marketing_phrases || [])];
        return { 
          ...item, 
          x: item.x, 
          y: item.y, 
          label: labelParts.join('\n') 
        };
      });

      this.tendencyChart.data.datasets[0].data = points;
      
      const withinRange = this.tendency.plottable_elements
        .filter((item: any) => item?.within_preference_range ?? false)
        .map((item: any) => ({ x: item.x, y: item.y }));

      if (this.tendencyChart.options.plugins) {
        (this.tendencyChart.options.plugins as any).groupingCircle = { points: withinRange };
      }

      const max = Math.max(...points.map((p: any) => Math.abs(p.x)), ...points.map((p: any) => Math.abs(p.y)), 1) + 10;
      if (this.tendencyChart.options.scales?.['x']) {
        (this.tendencyChart.options.scales['x'] as any).min = -max;
        (this.tendencyChart.options.scales['x'] as any).max = max;
      }
      if (this.tendencyChart.options.scales?.['y']) {
        (this.tendencyChart.options.scales['y'] as any).min = -max;
        (this.tendencyChart.options.scales['y'] as any).max = max;
      }

      this.tendencyChart.update();
    }
  }
}
