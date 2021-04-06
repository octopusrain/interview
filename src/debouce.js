// 截流
function throttle(fn, delay) {
  let timer = null
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
        timer = null
      }, delay)
    }
  }
}
// 防抖
function debouce(fn, delay) {
  let timer = null
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}
const fn = (n) => {
  console.log(n)
}
// 利用闭包,核心原理
const deb = debouce(fn, 500)
const deb1 = throttle(fn, 600)
let n = 10
while (n--) {
  deb(n)
  deb1(n)
}

function throttle(fn, delay) {
  let start = new Date().getTime()
  return function () {
    let now = new Date().getTime()
    if (now - start > delay) {
      fn.apply(this, arguments)
      start = now
    }
  }
}
// [{id:1, parentId: 0}, {id:2, parentId:1},{id:3, parentId:1}]
// 把这个数组从顶级分类递归查找子分类，最终构建一个树状数组。结果输出如下
// [{id:1, parentId: 0,children:[{id:2, parentId:1},{id:3, parentId:1}]}]
// parentId为0 的是根节点
const tempArr = [
  {
    id: 1,
    parentId: 0,
  },
  {
    id: 2,
    parentId: 1,
  },
  {
    id: 3,
    parentId: 1,
  },
  {
    id: 4,
    parentId: 2,
  },
]
function arr2Tree(arr) {
  arr.map((item) => {
    if (item.parentId !== 0) {
      arr.map((sub) => {
        if (sub.id === item.parentId) {
          if (!sub['children']) sub['children'] = []
          sub.children.push(item)
        }
      })
    }
  })
  console.log('arr', arr)
  return arr.filter((item) => item.parentId === 0)
}
console.log(arr2Tree(tempArr))
function arrayToTree(sourceArr) {
  sourceArr.forEach((item) => {
    let parentId = item.parentId
    if (parentId !== 0) {
      sourceArr.forEach((subitem) => {
        if (subitem.id == parentId) {
          if (!subitem.children) {
            subitem.children = []
          }
          subitem.children.push(item)
        }
      })
    }
  })
  console.log('sourceArr', sourceArr)
  return sourceArr.filter((item) => item.parentId === 0)
}
console.log(arrayToTree(tempArr))
;[(1, 2, 3, 4, 5)].map(parseInt)
function jz() {
  let str = '#'
  let colors = 'abcdef0123456789'
  for (let i = 0; i < 6; i++) {
    let key = Math.floor(Math.random() * 16)
    str += colors[key]
  }
  return str
}
console.log(jz())
