let int = 1
setTimeout(function () {
  console.log('5', int)
  int = 2
  new Promise((resolve, reject) => {
    resolve()
  }).then(function () {
    console.log('7', int)
    int = 7
  })
  console.log('6', int)
})
int = 3
console.log('1', int)
new Promise((resolve, reject) => {
  console.log('2', int)
  return resolve((int = 4))
}).then(function (res) {
  console.log('4', int)
  int = 5
  setTimeout(function () {
    console.log('8', int)
    int = 8
  })
  return false
})
console.log('3', int)
