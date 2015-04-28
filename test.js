var should = require('should')
var dot = require('./index')
var obj = { a: { b: { c: { d: 10, e: { f: 20}}}}}
var arr = [{ a: 0 }, { b: 1 }, { c: 2, kids: { one: 1, two: [obj, obj] }}]

describe('dot.get', function () {
  it('should find value by path', function () {
    dot.get(arr, '0.c.kids.two.0.a.b.c.e.f', 20).should.be.equal(20)
  })

  it('should return default value', function () {
    dot.get(obj, 'z.b.c.j', 'DEF').should.be.equal('DEF')
  })

  it('should return undefined if default value not provided', function () {
    (typeof dot.get(obj, 'a.0')).should.be.equal('undefined')
  })
})

describe('dot.set', function () {
  it('should set object value by path', function () {
    dot.set({}, 'a.b.c', 10).should.containDeep({ a: { b: { c: 10 }}})
  })

  it('should set array value by path', function () {
    dot.set([], '0.b', 10).should.containDeep([{
      b: 10
    }])
  })

})