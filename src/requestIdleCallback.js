// 实现requestIdleCallback 方法 利用MessageChannel & requestAnimationframe
let endTime = 0 // 当前帧结束时间
let pendingCallback = null // requestIdleCallback的回调方法
let channel = new MessageChannel()
channel.port2.onmessage = function (e) {
  console.log('e', e)
  let timeRema = timeRemaining()
  if (timeRema > 0) {
    pendingCallback &&
      pendingCallback({ didTimeout: timeRema < 0, timeRemaining })
  } else {
    document.body.innerText = `no remain time`
  }
}
function timeRemaining() {
  return endTime - performance.now()
}
window.requestIdleCallback = function (callback) {
  window.requestAnimationFrame((rayTime) => {
    endTime = rayTime + 16.66 // 当前帧结束时间 = 当前帧开始时间 + 16.66
    console.log('endtime', endTime)
    pendingCallback = callback
    channel.port1.postMessage(endTime)
  })
}
function cb(deadline) {
  console.log('deadline', deadline)
  if (deadline.timeRemaining()) {
    document.body.innerText = `当前帧剩余时间:${deadline.timeRemaining()}`
  } else {
    document.body.innerText = `no remain time`
  }
}
window.requestIdleCallback(cb)
