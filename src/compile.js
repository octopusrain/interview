// 解析{{aa}}字符串思路
function render(tpl, data) {
  let match
  let reg = /\{\{((?:.|\r?\n)+?)\}\}/g
  while ((match = reg.exec(tpl))) {
    tpl = tpl.replace(match[0], eval(match[1]))
  }
  return tpl
}
// data.a.b => data[a][b]
function formatData(str) {
  let reg = /^\.\s$/
  let replaceReg = /^\[\s\]$/
  return str.replace(reg, replaceReg)
}
var tpl = render(
  `<div>{{data.a}}</div><div>{{data.b.c}}</div><p>{{data}}</p>`,
  {
    a: 1,
    b: { c: 2 },
  }
)
console.log(tpl)
// abcd 输出所有组合
function Permutations(str) {
  let arr = []
  if (str.length === 1) return str
  for (const j in str) {
    let _str = removeStr(str, j)
    let left = str[j]
    let rest = Permutations(_str)
    console.log('rest', rest)
    for (const i in rest) {
      let tmp = left + rest[i]
      arr.push(tmp)
    }
  }
  return arr
}
function removeStr(str, key) {
  const arr = str.split('')
  arr.splice(key, 1)
  return arr.join('')
}
console.log(removeStr('abcd', 1))
console.log(Permutations('abcd'))
function swap(str, a, b) {
  let arr = str.split('')
  let i = str.indexOf(a)
  let j = str.indexOf(b)
  arr[i] = b
  arr[j] = a
  return arr.join('')
}
console.log(swap('abc', 'a', 'b'))

// 打印乘法表
function print() {
  let str = ''
  for (let i = 1; i < 10; i++) {
    for (let j = 1; j <= i; j++) {
      str += ` ${i}*${j}=${i * j}`
    }
    str += '\n'
  }
  console.log(str)
}
print()

// 打印杨辉三角 递归思路
// // 1
//   1 1
//  1 2 1
// 1 3 3 1
//1 4 6 4 1
function printYh(n) {
  for (let i = 0; i < n; i++) {
    let arr = []
    for (let j = 0; j <= i; j++) {
      arr.push(combination(i, j))
    }
    console.log(arr.join(' '))
  }
}
function combination(i, j) {
  if (j === 0) return 1
  if (j === i) return 1
  return combination(i - 1, j - 1) + combination(i - 1, j)
}
printYh(6)
