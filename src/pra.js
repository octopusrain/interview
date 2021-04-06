// eventloop
console.log(1)
async function async1() {
  console.log(2)
  await console.log(3)
  console.log(4)
}
setTimeout(() => {
  console.log(5)
}, 0)
async1()
new Promise((resolve) => {
  console.log(6)
  resolve()
}).then(function() {
  console.log(7)
})
console.log(8)

// 闭包
let x = 5
function fn(x) {
  return function(y) {
    console.log(y + ++x)
  }
}
let f = fn(6)
f(7)
console.log(x)

// call,apply,obj
// 第一个this指向obj1,第2个指向win,如果是node环境,则指向globel
var name = 'win'
var obj = {
  name: 'obj',
  normal() {
    return () => {
      console.log(this.name)
    }
  },
  arrow: () => {
    return function() {
      console.log(this.name)
    }
  },
}
var obj1 = { name: 'obj1' }
obj.normal.call(obj1)()
obj.arrow.call(obj1)()

let object = { a: 0 }
function fun(obj) {
  console.log(obj)
  obj.a = 1
  console.log(obj)
  obj = { a: 2 }
  console.log(obj)
  obj.b = 2
  console.log(obj)
}
fun(object)
console.log(object)

// [9,4,7,6,10] => [7,10,9,6,4] 一个无序数组转成有序,奇数从小到大,偶数从大到小,不改变数组的奇偶序号
function Interval(callback, timeout) {
  let res = { target: '' }
  function fn() {
    callback()
    res.target = setTimeout(fn, timeout)
  }
  fn()
  return res
}
function clear(timer) {
  clearTimeout(timer.target)
}
let n = 6
// var timer = Interval(function () {
//   console.log(n)
//   n--
//   if (n < 1) {
//     clear(timer)
//   }
// }, 1000)
function query(key, url = location.search) {
  let res = {}
  let params = url.split('?')[1]
  if (params) {
    let arr = params.split('&')
    for (let i = 0; i < arr.length; i++) {
      let a = arr[i].split('=')
      res[a[0]] = a[1]
    }
  }
  return res[key]
}
// console.log(query('a', 'http://www.baidu.com?a=1'))
// abcaabbdbac
function maxStr(str) {
  if (!str.length) return 0
  let arr = []
  let max = 0
  for (let i = 0; i < str.length; i++) {
    const index = arr.indexOf(str[i])
    if (index !== -1) {
      arr.splice(0, index + 1)
    }
    arr.push(str[i])
    max = Math.max(max, arr.length)
  }
  return max
}
// console.log('max', maxStr('abcaabbdbac'))
function maxSpan(arr) {
  if (arr.length < 2) return 0
  let start = arr[0]
  let max = arr[1] - arr[0]
  for (let i = 2; i < arr.length; i++) {
    if (arr[i] < start) {
      start = arr[i]
    } else {
      max = Math.max(arr[i] - start, max)
    }
  }
  return max > 0 ? max : 0
}
console.log('maxspan', maxSpan([2, 3, 4, 1, 5]))
function maxSpan2(arr) {
  let max = 0
  for (let i = 1; i < arr.length; i++) {
    max = max + Math.max(arr[i] - arr[i - 1], 0)
  }
  return max
}
console.log('maxspan2', maxSpan2([2, 3, 4, 1, 5]))

function fbo(n, a1 = 1, a2 = 1) {
  if (n === 1) return a1
  if (n === 2) return a2
  return fbo(n - 1) + fbo(n - 2)
}
function fbo1(n, a1 = 1, a2 = 1) {
  let arr = []
  arr.push(a1)
  arr.push(a2)
  while (n >= 3) {
    n--
    let prev = arr.pop()
    let cur = prev + arr.pop()
    arr.push(prev)
    arr.push(cur)
  }
  return arr.pop()
}
console.log(fbo(21), fbo1(28))

function maxCommonStr(arr) {
  let max = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === '') return '' // 如果某一项为空,直接返回
    for (let j = 0; j < arr[i].length; j++) {
      if (max[j] !== arr[i][j]) {
        max = max.substring(0, j)
        break
      }
    }
  }
  return max
}
console.log(maxCommonStr(['flower', '', 'float']))
