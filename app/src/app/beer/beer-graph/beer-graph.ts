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
  Filler
);

@Component({
  selector: 'beer-graph',
  imports: [],
  templateUrl: './beer-graph.html',
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 400px;
    }
  `]
})
export class BeerGraph implements AfterViewInit, OnChanges {
  context!: CanvasRenderingContext2D;
  chart: Chart | undefined;
  @ViewChild('graphCanvas') canvas!: ElementRef<HTMLCanvasElement>;
  @Input() data: any;

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
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.updateChart();
    }
  }

  private updateChart() {
    if (this.chart && Array.isArray(this.data)) {
      this.chart.data.labels = this.data.map((d: any) => d.t);
      this.chart.data.datasets[0].data = this.data.map((d: any) => d.intensity);
      this.chart.update();
    }
  }
}
