Function.prototype.myCall = function (context) {
  context = context || global
  let fn = Math.random().toString().slice(0, 8)
  context[fn] = this
  const arg = [...arguments].slice(1)
  let res = context[fn](...arg)
  delete context[fn]
  return res
}
Function.prototype.myApply = function (context) {
  context = context || globalThis
  let fn = Math.random().toString().slice(0, 8)
  context[fn] = this
  const [arg] = [...arguments].slice(1)
  let res = context[fn](...arg)
  delete context[fn]
  return res
}
Function.prototype.myBind = function (context) {
  let _this = this
  let arg = [...arguments].slice(1)
  return function () {
    let newArg = [...arguments]
    return _this.myCall(context, ...arg.concat(newArg))
  }
}
function fn1(num, num1) {
  console.log(this.count + num + num1)
}
var count = 1
var obj = { count: 2 }
fn1.myCall(obj, 1, 3)
fn1.myApply(obj, [1, 2])
var fn2 = fn1.myBind(obj, 1, 2)
fn2()
// fn.apply()
function curry(fn) {
  // console.log('fn', fn.length)
  let arg = []
  return function () {
    // console.log(arg, ...arguments)
    arg = arg.concat([...arguments])
    if (arg.length >= fn.length) {
      return fn(...arg)
    }
    return arguments.callee
  }
}
var add = function (a, b, c, d) {
  return a + b + c + d
}
// console.log(add(1, 2))
var add1 = curry(add)(4)(5)(1)
console.log(add1(1, 3, 2))
var max = Math.max
console.log(max.myApply(null, [1, 3, 2]))

function myBind(context) {
  let arg = [...arguments].slice(1)
  let _this = this // 函数调用者
  return function () {
    let newArg = [...arguments]
    _this.myCall(context, ...arg.concat(newArg)) // 调用call方法,this指向context
  }
}
