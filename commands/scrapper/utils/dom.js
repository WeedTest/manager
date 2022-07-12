import jsdom from 'jsdom';
import reader from './reader.js';

export default async function (entry) {
  const content = await reader(entry);
  const { document } = new jsdom.JSDOM(content).window;
  return document;
}
