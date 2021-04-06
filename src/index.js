let a = { x: 1 }
let b = a
a.c = a = { x: 2 }
// a.c = { x: 2 }
// a = { x: 2 }
console.log(a)
console.log(b)
const timeout = (time) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve()
    }, time)
  )
async function t1() {
  console.log(1)
  console.log(2)
  new Promise(function (resolve) {
    console.log('promise3')
    resolve()
  })
    .then(function () {
      console.log('promise4')
    })
    .then(function () {
      console.log('pro11')
    })
  await new Promise(function (resolve) {
    console.log('b')
    resolve()
  }).then(function () {
    console.log('t1p')
  })

  console.log(3)
  console.log(4)
  new Promise(function (resolve) {
    console.log('promise5')
    resolve()
  }).then(function () {
    console.log('promise6')
  })
}

async function t2() {
  console.log(5)
  console.log(6)
  await Promise.resolve().then(() => console.log('t2p'))
  console.log(7)
  console.log(8)
}

t1()
new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})
t2()

console.log('end')
// 1,2,p3,b,p1,5,6,end,p4,t1p,p2,t2p,3,4,p5,7,8,p6,set
