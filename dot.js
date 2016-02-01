(function(root) {
  'use strict';
  let is = x => x!=null

  let split = x => 'string'==typeof x ? x.replace(/^\w/,'.$&').match(/\W?\w+/g) : x;

  function set(o, path, val) {
      let arr = split(path);
      if(val===get(o, arr))
        return false;

      let last = arr.pop().slice(1);
      arr.reduce((m, chunk) => {
        let x = chunk.slice(1)
        return x in m ? m[x] : (m[x] = chunk[0]=='[' ? [] : {});
      }, o)[last] = val;
      return true
    }

  function remove(o, path) {
      let arr = split(path);
      let last = arr.pop().slice(1)
      let prev = get(o, arr)
      if(is(prev))
        return prev.splice ? !!prev.splice(+last, 1) : (delete prev[last]);
      return false;
    }

  function get(o, path, val) {
      split(path).every(x => is(o=o[x.slice(1)]));
      return is(o) ? o : val
    }

  let dot = {get:get, set:set, remove:remove}

  if('undefined'!=typeof module && module.exports)
    module.exports = dot;
  else if('function'==typeof define)
    define([], () => dot);
  else
    root.dot = dot;
})(this)


// (function(is) {
//   function before(fn) {
//       return function(o, path, val) {
//           return is(o,'o')&&is(path,'s') ? fn(o, path.split('.'), val) : val;
//         }
//     }

//   function get(o, path, val) {
//       path.every(function(x) {
//           return is(o=o[x]);
//         });
//       return is(o) ? o : val;
//     }

//   function set(o, path, val) {
//       var last = path.pop();
//       path.reduce(function parse(m, x, i, a) {
//             return is(m[x]) ? m[x] : (m[x]=/\D/.test(a[i+1]) ? {} : []);
//           }, o)[last] = val;
//         return o;
//     }

//   var dot={ get: before(get), set: before(set)}

//   if('undefined'!=typeof module && module.exports)
//     module.exports = dot;
//   else if('function'==typeof define)
//     define([],function(){ return dot;});
//   else
//     root.dot=dot;

// }.call(this, function(x, t) {
//     return t ? t===(typeof x)[0] : x!=null;
//   }));