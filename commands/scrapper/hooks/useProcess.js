export default function () {
  const root = process.argv[2];
  function getEntry() {
    let entry = root;
    process.argv.forEach((el) => {
      if (el.includes('--file=')) {
        entry += el.replace('--file=', '\\');
      }
    });
    return entry;
  }

  function getPrefix() {
    let prefix = '';
    process.argv.forEach((el) => {
      if (el.includes('--prefix=')) {
        prefix = el.replace('--prefix=', '');
      }
    });
    return prefix;
  }

  return {
    entry: getEntry(),
    prefix: getPrefix(),
    root: root,
  };
}
