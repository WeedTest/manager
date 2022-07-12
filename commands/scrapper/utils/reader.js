import fs from 'fs/promises';

export default async function (path) {
  try {
    const content = await fs.readFile(path, { encoding: 'utf8' });
    console.log(`html content length: ${content.length}`);
    return content;
  } catch (err) {
    console.log(err);
  }
};
