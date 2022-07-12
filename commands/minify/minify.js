import fs from 'fs';
import writer from '../scrapper/utils/writer.js';
import { minify } from 'minify';
import useProcess from '../scrapper/hooks/useProcess.js';

async function main() {
  const { root } = useProcess();

  //joining path of directory
  fs.readdir(root, async function (err, files) {
    //handling error
    if (err) {
      return console.error('Unable to scan directory: ' + err);
    }

    const options = {
      html: {
        removeAttributeQuotes: false,
      },
      css: {
        compatibility: '*',
      },
      js: {
        ecma: 5,
      },
    };

    files.forEach(async function (file, index) {
      const path = root + '\\' + file;
      console.log(path);
      let data = '';
      try {
        data = await minify(path, options);
      } catch (error) {
        data = '';
      } finally {
        if (data.length) {
          writer(path, data, false);
        }
        if (files.length - 1 === index) {
          console.log(`files in ${root} was minified`);
        }
      }
    });
  });
}
main();
