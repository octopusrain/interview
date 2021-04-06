const PENDING = 'pending'
const FULLFILL = 'fullfilled'
const ERROR = 'rejected'
class Promise {
  constructor(fn) {
    this.status = PENDING
    this.value = undefined
    this.resolveQuequ = []
    this.rejectQuequ = []
    const _resolve = (val) => {
      const run = () => {
        if (this.status !== PENDING) return
        this.status = FULLFILL
        this.value = val
        this.resolveQuequ.map((item) => item(val))
      }
      // 添加到异步队列
      setTimeout(run)
    }
    const _reject = (val) => {
      const run = () => {
        if (this.status !== PENDING) return
        this.status = ERROR
        this.value = val
        this.rejectQuequ.map((item) => item(val))
      }
      setTimeout(run)
    }
    // 自执行
    fn(_resolve, _reject)
  }
  then(resolveFn, rejectFn) {
    return new Promise((resolve, reject) => {
      // 检测resolveFn,rejectFn是不是函数,转化为函数
      typeof resolveFn !== 'function' ? (resolveFn = (val) => val) : null
      typeof rejectFn !== 'function' ? (rejectFn = (val) => val) : null
      // 重写resolveFn,让其支持返回值也为一个promise,递归调用
      const resFn = (val) => {
        try {
          const x = resolveFn(val)
          x instanceof Promise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      }
      // 同理
      const rejFn = (val) => {
        try {
          const x = rejectFn(val)
          x instanceof Promise ? x.then(resolve, reject) : reject(x)
        } catch (error) {
          reject(error)
        }
      }
      if (this.status === PENDING) {
        this.resolveQuequ.push(resFn)
        this.rejectQuequ.push(rejFn)
      } else if (this.status === FULLFILL) {
        resolveFn(this.value)
      } else {
        rejectFn(this.value)
      }
    })
  }
  catch(rejectFn) {
    this.then(undefined, rejectFn)
  }
  static all(promiseArr) {
    let index = 0
    let resultArr = []
    return new Promise((resolve, reject) => {
      promiseArr.map((item) =>
        item
          .then((res) => {
            index++
            resultArr.push(res)
            if (index === promiseArr.length) {
              resolve(resultArr)
            }
          })
          .catch((err) => reject(err))
      )
    })
  }
}
const proA = new Promise((resolve) =>
  setTimeout(() => {
    resolve(1)
  }, 600)
)
const proB = new Promise((resolve, reject) =>
  setTimeout(() => {
    reject(0)
  }, 1500)
)
Promise.all([proA, proB]).then((res) => console.log(res))
