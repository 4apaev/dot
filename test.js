'use strict';
let dot = require('./_dot')

let { equal, deepEqual } = require('assert');

describe('dot.get', () => {

  it('should find value by path', () => {
      let arr = [0, 1, { c: 2,kids: {one: 1,two: [1,2]}}]
      let expected = arr[2].kids.two[1];
      let actual = dot.get(arr, '[2].kids.two[1]')
      equal(actual, expected)
    });

  it('should return default value', () => {
    let o = { a:1, b:2 }
    let expected = 'nada'
    let actual = dot.get(o, 'a.b.c.d', expected)
    equal(actual, expected)
  });

  it('should return undefined if default value not provided', () =>
     equal(typeof dot.get({}, 'a,b'), 'undefined'));
})

describe('dot.remove', () => {

  it('should delete object property and return true', () => {
    let o = { a: { b: 1 }, c: [1,2,3] }
    equal(dot.remove(o, 'a.b'), true)
    deepEqual(o, { a: {}, c: [1,2,3] })
  })

  it('should remove array entry and return true', () => {
    let o = { b: [1,2,3,4,5] }
    equal(dot.remove(o, 'b[0]'), true)
    deepEqual(o, { b:[2,3,4,5]})
  })

  it('should return false when removing constant', () => {
    let o = { a:{} }
    equal(dot.remove(o, 'a.b'), false)
    deepEqual(o, { a:{} })
  })

})

describe('dot.set', () => {

  it('should set object value by path', () => {
    let o = {}
    dot.set(o, 'a.b.c', 10)
    deepEqual(o, { a: { b: { c: 10 }}})
  })

  it('should set array value by path', () => {
    let a = []
    dot.set(a, '[0].b', 10)
    deepEqual(a, [{ b: 10 }])
  })

  let o = [[{name:'olo'}]];

  it('should set nested mixed object value by path', () => {
    dot.set(o, '[0][0].name', 'deep')
    deepEqual(o, [[{name:'deep'}]])

  })

  it('should set nested mixed object value by path', () => {
    dot.set(o, '[0][0].item[1].value', false)
    deepEqual(o, [[{name:'deep', item:[,{value:false}]}]])
  })


  it('should return false for same value', () => {
    let o = { a: { b: { c: 10 }}}
    equal(dot.set(o, 'a.b.c', 10), false);
  })

  it('should return true for fresh value', () => {
    let o = { a: { b: { c: 10 }}}
    equal(dot.set(o, 'a.b.c', 20), true);
  })
})