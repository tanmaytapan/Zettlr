import Chart from 'chart.js/auto';

export function renderChart(ctx: CanvasRenderingContext2D, config: any) {
  new Chart(ctx, config);
}