;(function() {

  function def(x) { return x != null }

  function get(o, path, val) {
    path.every(function(x) {
      return def(o=o[x]); })
    return def(o) ? o : val
  }

  function set(o, path, val) {
    var last = path.pop()
    path.reduce(function(m, x, i, a) {
      return def(m[x])
        ? m[x]
        : (m[x] = /\D/.test(a[i+1])
           ? {}
           : [])
    }, o)[last] = val
    return o;
  }

  function before(fn) {
    return function(o, path, val) {
      if(def(o) && 'object' === typeof o && 'string' === typeof path)
        return fn(o, path.split('.'), val)
      else
        return val
    }
  }

  var dot = { get: before(get), set: before(set) }

  if('undefined'!=typeof module && module.exports){
    module.exports = dot
  }
    else
      if('function'==typeof define){
        define([], function() { return dot }); }
      else{
        this.dot=dot;
}}());