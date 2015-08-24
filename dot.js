(function(is) {
  function before(fn) {
      return function(o, path, val) {
          return is(o,'o')&&is(path,'s') ? fn(o, path.split('.'), val) : val;
        }
    }

  function get(o, path, val) {
      path.every(function(x) {
          return is(o=o[x]);
        });
      return is(o) ? o : val;
    }

  function set(o, path, val) {
      var last = path.pop();
      path.reduce(function parse(m, x, i, a) {
            return is(m[x]) ? m[x] : (m[x]=/\D/.test(a[i+1]) ? {} : []);
          }, o)[last] = val;
        return o;
    }

  var dot={ get: before(get), set: before(set)}

  if('undefined'!=typeof module && module.exports)
    module.exports = dot;
  else if('function'==typeof define)
    define([],function(){ return dot;});
  else
    root.dot=dot;

}.call(this, function(x, t) {
    return t ? t===(typeof x)[0] : x!=null;
  }));