import dom from './utils/dom.js';
import writer from './utils/writer.js';
import useProcess from './hooks/useProcess.js';

const { entry } = useProcess();

function makeChange(document) {
  document.querySelectorAll('*').forEach((el) => {
    if (el.style.display === 'none') el.remove();
  });
  document
    .querySelectorAll('script,noscript,input[type="hidden"]')
    .forEach((el) => {
      el.remove();
    });
  document.querySelectorAll('a').forEach((el) => {
    el.href = '#';
  });
  return document;
}

function trim(html) {
  return html
    .trim()
    .replace(/class=""|style=""| on([a-z]*)="([^"]*)"/g, '')
    .replace(/&quot;/g, "'");
}

async function main(entry) {
  const document = await dom(entry);
  const changes = makeChange(document).documentElement.outerHTML;
  writer(entry, trim(changes));
  console.log('dom cleaned');
}

main(entry);
