require('fs').writeFile('./index.js', require('uglify-js').minify('./dot.js', {
  mangle: true,
  compress: {
    sequences: true,
    dead_code: true,
    conditionals: true,
    booleans: true,
    unused: true,
    if_return: true,
    join_vars: true,
    drop_console: true }}).code, console.log.bind(console, 'DONE'));