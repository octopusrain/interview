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
function limitUpload1(files, max) {
  let res = []
  let len = files.length
  return new Promise((resolve, reject) => {
    const start = async () => {
      if (files.length) {
        const file = files.shift()
        try {
          await upload(file)
          res.push(file)
          max++
          start()
        } catch (error) {
          reject(error)
        }
      }
      if (res.length === len) {
        resolve(res)
      }
    }
    while (max > 0) {
      start()
      max--
    }
  })
}
limitUpload(files, 4).then((res) => console.log('res', res))
