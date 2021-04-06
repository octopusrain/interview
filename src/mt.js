var a = 1
;(function () {
  console.log(a + this.a) // undefined+1 = NaN
  // var a = '2'
  console.log(a + this.a) // '2'+1 = 21
})()
setTimeout(() => {
  console.log(1)
}, 0)
new Promise((reoslve) => {
  console.log(2)
  for (let i = 0; i < 10000; i++) {
    i === 9999 && reoslve()
  }
  console.log(3)
}).then(() => console.log(4))
console.log(5)
