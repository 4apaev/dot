'use strict';
const is = x => x!=null;
const identity = x => x;
const split = x => 'string'==typeof x ? ('.'+x).match(/\W?\w+/g) : x;
const get = (src, path, fallback) => split(path).every(chunk => is(src=src[chunk.substr(1)])) ? src : fallback;

function deep(buf, chunk) {
  let key = chunk.substr(1);
  return key in buf ? buf[key] : identity(buf[key] = chunk.charAt(0)=='[' ? [] : {});
}

function set(src, path, val, chunks = split(path)) {
  let last = chunks.pop().substr(1);
  let trg = chunks.reduce(deep, src);
  return identity(trg[last]!=val, trg[last]=val);
}

function remove(src, path, chunks = split(path)) {
  let last = chunks.pop().substr(1);
  let prev = get(src, chunks);
  return is(prev) && last in prev && identity(Array.isArray(prev) ? !!prev.splice(+last, 1) : delete prev[last]);
}

module.exports = { get, set, remove }