// 求一个字符串中每个字母出现的次数
let str = 'abcabdaac'
function each(param, callback) {
  try {
    for (let i in param) {
      if (param.hasOwnProperty(i)) {
        callback(param[i], i, param)
      }
    }
  } catch (error) {
    throw error
  }
}
Array.prototype.myReduce = function (cb, initValue) {
  let _this = this
  var hasInit = initValue !== void 0
  var acc = hasInit ? initValue : _this[0]
  each(
    hasInit ? _this : Array.prototype.slice.call(_this, 1),
    function (v, k, o) {
      acc = cb(acc, v, k, o)
    }
  )
  return acc
}
var a = str.split('').reduce((res, cur) => {
  res[cur] ? res[cur]++ : (res[cur] = 1)
  return res
}, {})
// {a: 4, b: 2, c: 2, d: 1}

var a1 = str.split('').myReduce((prev, cur) => {
  prev[cur] ? prev[cur]++ : (prev[cur] = 1)
  return prev
}, {})

console.log(a, a1)
function each(param, callback) {
  try {
    for (let i in param) {
      if (Object.hasOwnProperty(i)) {
        callback(param[i], i, param)
      }
    }
  } catch (error) {
    throw error
  }
}
Array.prototype.myReduce = function (fn, init) {
  let hasInit = init !== void 0
  let _this = this
  let acc = hasInit ? init : _this[0] // 初始值
  each(
    hasInit ? _this : Array.prototype.slice.call(_this, 1),
    function (v, k, o) {
      fn(acc, v, k, o)
    }
  )
  return acc
}
