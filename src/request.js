const request = (url, option = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: url })
    }, 2000)
  })
}
const cache = new Map()
const cacheRequest = (url, option = {}) => {
  let key = `${url}:${option.method || 'get'}`
  if (cache.has(key)) {
    if (cache.get(key).status === 'pending') {
      return cache.get(key).myWait
    }
    return Promise.resolve(cache.get(key).data)
  } else {
    let requestApi = request(url, option)
    cache.set(key, { status: 'pending', myWait: requestApi })
    return requestApi
      .then((res) => {
        cache.set(key, { status: 'success', data: res })
        return Promise.resolve(res)
      })
      .catch((err) => {
        cache.set(key, { status: 'fail', data: err })
        return Promise.reject(err)
      })
  }
}
// cacheRequest('url1').then((res) => console.log('res1', res))
// setTimeout(() => {
//   cacheRequest('url1').then((res) => console.log('res3', res))
// }, 2100)
const promisify = (fn, context) => {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn.apply(context, [
        ...args,
        (err, res) => {
          return err ? reject(err) : resolve(res)
        },
      ])
    })
  }
}
function awaitWrap(promiseArr) {
  let res = []
  let len = promiseArr.length
  return new Promise(async (resolve, reject) => {
    try {
      while (promiseArr.length) {
        let cur = promiseArr.shift()
        let curResult = await cur()
        res.push(curResult)
      }
      if (res.length === len) {
        resolve(res)
      }
    } catch (error) {
      reject(error)
      console.log(error)
    }
  })
}
const promiseArr = [1, 2, 3].map((item) => {
  return () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(item)
        console.log(item)
      }, 1000)
    })
})
console.log('promise', promiseArr)
const fn = (callback) => {
  setTimeout(() => {
    callback(null, 4)
    console.log(4)
  }, 1000)
}
promiseArr.unshift(promisify(fn))
awaitWrap(promiseArr).then((res) => {
  console.log(res)
})
Promise.all(promiseArr).then((res) => console.log('res', res))
