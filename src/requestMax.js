const pify = require('pify')

class RequestDecorator {
  constructor({ maxLimit = 5, requestApi, needChange2Promise }) {
    // 最大并发量
    this.maxLimit = maxLimit
    // 请求队列,若当前请求并发量已经超过maxLimit,则将该请求加入到请求队列中
    this.requestQueue = []
    // 当前并发量数目
    this.currentConcurrent = 0
    // 使用者定义的请求api，若用户传入needChange2Promise为true,则将用户的callback类api使用pify这个库将其转化为promise类的。
    this.requestApi = needChange2Promise ? pify(requestApi) : requestApi
  }
  // 发起请求api
  async request(...args) {
    // 若当前请求数并发量超过最大并发量限制，则将其阻断在这里。
    // startBlocking会返回一个promise，并将该promise的resolve函数放在this.requestQueue队列里。这样的话，除非这个promise被resolve,否则不会继续向下执行。
    // 当之前发出的请求结果回来/请求失败的时候，则将当前并发量-1,并且调用this.next函数执行队列中的请求
    // 当调用next函数的时候，会从this.requestQueue队列里取出队首的resolve函数并且执行。这样，对应的请求则可以继续向下执行。
    if (this.currentConcurrent >= this.maxLimit) {
      await this.startBlocking()
    }
    try {
      this.currentConcurrent++
      console.log('currentConcurrent', this.currentConcurrent)
      console.log('requestQueue', this.requestQueue.length)
      const result = await this.requestApi(...args)
      return Promise.resolve(result)
    } catch (err) {
      return Promise.reject(err)
    } finally {
      console.log('当前并发数:', this.currentConcurrent)
      this.currentConcurrent--
      console.log('finalcurrentConcurrent', this.currentConcurrent)
      this.next()
    }
  }
  // 新建一个promise,并且将该reolsve函数放入到requestQueue队列里。
  // 当调用next函数的时候，会从队列里取出一个resolve函数并执行。
  startBlocking() {
    let _resolve
    let promise2 = new Promise((resolve) => (_resolve = resolve))
    console.log('_resolve1', _resolve)
    this.requestQueue.push(_resolve)
    return promise2
  }
  // 从请求队列里取出队首的resolve并执行。
  next() {
    if (this.requestQueue.length <= 0) return
    const _resolve = this.requestQueue.shift()
    _resolve()
  }
}
const files = [...new Array(15).keys()]
function upload(file) {
  return new Promise((resolve) => {
    const time = Math.random() * 3000
    console.log('start', file)
    setTimeout(() => {
      console.log('end', file)
      resolve(file)
    }, time)
  })
}
function limitUpload(files, max) {
  let count = 0 // 记录当前并发数量
  let resolveQuque = [] // 记录被拦下的异步任务队列
  let result = [] // 保存最后执行的结果
  return new Promise((resolve, reject) => {
    const run = async (file) => {
      count++ // 计数+1
      if (count > max) {
        // 如果当前并发数大于 最大限制 await一个异步微任务阻塞的后面任务执行
        await new Promise((resolve) => resolveQuque.push(resolve)) // 将异步微任务的resolve函数添加到队列
      }
      try {
        const res = await upload(file) // 执行异步任务
        result.push(res) // 存下执行结果
        if (result.length === files.length) {
          // 如果执行结果数组长度===需要执行任务数组长度,resolve
          resolve(result)
        }
      } catch (error) {
        reject(error)
      } finally {
        count-- // 当前执行的任务计数-1
        if (resolveQuque.length) {
          // 弹出一个被拦下的异步任务 并执行它的resolve函数
          resolveQuque.shift()()
        }
      }
    }
    files.map((file) => run(file))
  })
}
limitUpload(files, 4).then((res) => console.log('res', res))
module.exports = RequestDecorator
