(function(root) {
  'use strict';
  let is = x => x!=null;

  let split = x => 'string'==typeof x ? x.replace(/^\w/,'.$&').match(/\W?\w+/g) : x;

  function set(o, path, val) {
      let arr = split(path);
      if(val===get(o, arr))
        return false;

      let last = arr.pop().slice(1);
      arr.reduce((m, chunk) => {
        let x = chunk.slice(1);
        return x in m ? m[x] : (m[x] = chunk[0]=='[' ? [] : {});
      }, o)[last] = val;
      return true;
    }

  function remove(o, path) {
      let arr = split(path);
      let last = arr.pop().slice(1);
      let prev = get(o, arr);
      if(is(prev))
        return prev.splice ? !!prev.splice(+last, 1) : (delete prev[last]);
      return false;
    }

  function get(o, path, val) {
      split(path).every(x => is(o=o[x.slice(1)]));
      return is(o) ? o : val;
    }

  let dot = {get:get, set:set, remove:remove};

  if('undefined'!=typeof module && module.exports)
    module.exports = dot;
  else if('function'==typeof define)
    define([], () => dot);
  else
    root.dot = dot;
})(this);