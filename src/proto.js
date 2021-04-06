var o = {
  a: 2,
  m: function () {
    return this.a + 1
  },
}

console.log(o.m()) // 3
// 当调用 o.m 时，'this' 指向了 o.

var p = Object.create(o)
// p是一个继承自 o 的对象

p.a = 4 // 创建 p 的自身属性 'a'
p.b = 5
console.log(p.m()) // 5

for (let i in p) {
  console.log(p[i])
}
