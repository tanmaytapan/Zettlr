import MarkdownIt from 'markdown-it';
import MarkdownItCustomBlock from 'markdown-it-custom-block';

const md = new MarkdownIt();

md.use(MarkdownItCustomBlock, {
  chart: function (content: string) {
    return `<canvas class="chartjs-render" data-config='${content}'></canvas>`;
  }
});