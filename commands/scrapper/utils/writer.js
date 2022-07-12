import fs from 'fs/promises';
import prettify from './prettify.js';

export default function (path, content, canPrettify = true) {
  fs.writeFile(path, canPrettify ? prettify(content) : content, (error) => {
    if (error) throw error;
  });
}
