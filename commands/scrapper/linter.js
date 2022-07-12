import dom from './utils/dom.js';
import writer from './utils/writer.js';
import useProcess from './hooks/useProcess.js';

const { entry, prefix } = useProcess();

function prefixer(path, { prefix, folder }) {
  const prefixed = prefix + folder + '/' + path.split('/').pop();
  console.log(`${path} => ${prefixed}`);
  return prefixed;
}

function resolveCss(document, prefix) {
  document.querySelectorAll('link[href$=".css"]').forEach((el) => {
    el.href = prefixer(el.href, { prefix, folder: 'css' });
  });
}

function resolveJs(document, prefix) {
  document.querySelectorAll('script').forEach((el) => {
    if(!el.src.length) return;
      el.src = prefixer(el.src, { prefix, folder: 'js' });
  });
}

function resolveFrame(document, prefix) {
  document.querySelectorAll('iframe').forEach((el) => {
    if(!el.src.length) return;
      el.src = prefixer(el.src, { prefix, folder: 'frames' });
  });
}

function resolveImages(document, prefix) {
  document.querySelectorAll('img').forEach((el) => {
    if(el.src.includes('data:image')) return;
    el.src = prefixer(el.src, { prefix, folder: 'images' });
  });
    document.querySelectorAll('link[href$=".ico"],link[href$=".png"]').forEach((el) => {
    el.href = prefixer(el.href, { prefix, folder: 'images' });
  });
}

function resolveBg(document, prefix) {
  document
    .querySelectorAll('[style*="background"][style*="url"]')
    .forEach((el) => {
      const bg = el.style.background;
      function getBgUrl(bg) {
        return prefixer(bg.match(/url\((.*)\)/)[1], {
          prefix,
          folder: 'images',
        });
      }
      function setBgUrl(bg, url) {
        return bg.replace(/url\(.*\)/, `url("${url}")`);
      }
      el.style.background = setBgUrl(bg, getBgUrl(bg));
    });
}

function resolve(document, prefix) {
  resolveCss(document, prefix);
  resolveImages(document, prefix);
  resolveBg(document, prefix);
  resolveJs(document, prefix);
  resolveFrame(document, prefix);
}

async function main(entry, prefix) {
  const document = await dom(entry);
  resolve(document, prefix);
  writer(entry, document.documentElement.outerHTML);
  console.log('dom linted');
}

main(entry, prefix);
