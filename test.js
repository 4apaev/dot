'use strict';
let log = console.log.bind(console)
let assert = require('assert');

let dot = require('./dot')
let obj = { a: { b: { c: { d: 10, e: { f: 20}}}}}
let arr = [{ a: 0 }, { b: 1 }, { c: 2, kids: { one: 1, two: [obj, obj] }}]

let eq = assert.deepEqual
let equal = (msg, a, b) => it(msg, () => assert.equal(a, b))

describe('dot.get', () => {
  equal('should find value by path', dot.get(arr, '[0].c.kids.two[1].a.b.c.e.f', 20), 20)
  equal('should return default value', dot.get(obj, 'z.b.c.j', 'DEF'), 'DEF')
  equal('should return undefined if default value not provided', typeof dot.get(obj, 'a[0]'), 'undefined')
})

describe('dot.set', () => {

  it('should set object value by path', () => {
    let o = {}
    dot.set(o, 'a.b.c', 10)
    eq(o, { a: { b: { c: 10 }}})
  })

  it('should set array value by path', () => {
    let a = []
    dot.set(a, '[0].b', 10)
    eq(a, [{ b: 10 }])
  })

  let o = [[{name:'olo'}]];

  it('should set nested mixed object value by path', () => {
    dot.set(o, '[0][0].name', 'deep')
    eq(o, [[{name:'deep'}]])

  })

  it('should set nested mixed object value by path', () => {
    dot.set(o, '[0][0].item[1].value', false)
    eq(o, [[{name:'deep', item:[,{value:false}]}]])
  })


  it('should return false for same value', () => {
    let o = { a: { b: { c: 10 }}}
    assert.equal(dot.set(o, 'a.b.c', 10), false);
  })

  it('should return true for fresh value', () => {
    let o = { a: { b: { c: 10 }}}
    assert.equal(dot.set(o, 'a.b.c', 20), true);
  })
})