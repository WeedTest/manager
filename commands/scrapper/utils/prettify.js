import prettier from 'prettier';

export default function (string) {
  const res = prettier.format(string.replace(/></g, '>\n<'), {
    parser: 'html',
  });
  console.log('content prettifed');
  return res;
}
