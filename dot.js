(function(root, factory) {
  if('function' === typeof define && define.amd)
    define([], factory)
  else {
    if('object' === typeof exports)
      module.exports = factory();
    else
      root.dot = factory();
}}(this, function(){

  function is(x, type) {
    return type === typeof x
  }

  function def(x) {
    return x != null
  }

  function get(o, path, val) {
    path.every(function(x) {
      return def(o=o[x]);
    })
    return def(o) ? o : val
  }

  function set(o, path, val) {
    var last = path.pop()
    path.reduce(function(m, x, i, a) {
      return def(m[x])
        ? m[x]
        : (m[x] = /\D/.test(a[i+1])
           ? {}
           : []);
    }, o)[last] = val
    return o;
  }

  function before(fn) {
    return function(o, path, val) {

      if(def(o) && is(o, 'object') && is(path, 'string'))
        return fn(o, path.split('.'), val)
      else
        return val
    }
  }
  return {
    get: before(get),
    set: before(set)
  }
}))