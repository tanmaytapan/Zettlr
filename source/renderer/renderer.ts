import { renderChart } from './renderChart';
import MarkdownIt from 'markdown-it';
import MarkdownItCustomBlock from 'markdown-it-custom-block';

const md = new MarkdownIt();
md.use(MarkdownItCustomBlock, {
  chart: function (content: string) {
    return `<canvas class="chartjs-render" data-config='${content}'></canvas>`;
  }
});

export function renderMarkdownWithCharts(markdown: string): string {
  const html = md.render(markdown);
  const container = document.getElementById('markdown-container');
  if (container) {
    container.innerHTML = html;
    const chartBlocks = container.querySelectorAll('.chartjs-render');
    chartBlocks.forEach(block => {
      const config = JSON.parse(block.getAttribute('data-config') || '{}');
      const canvas = block as HTMLCanvasElement;
      renderChart(canvas.getContext('2d')!, config);
    });
  }
  return html;
}
