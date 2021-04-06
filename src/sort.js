const quickSort = (arr) => {
  if (arr.length <= 1) {
    return arr
  }
  let pivotIndex = Math.floor(arr.length / 2)
  let pivot = arr.splice(pivotIndex, 1)[0] // 确定基准
  let left = [],
    right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([pivot], quickSort(right))
}
// 给定一个数组排序，使得奇数位的值不大于相邻偶数位的值
// [2,3,5,1,2,4,6,8,3,9,7] =>[5,2,3]=>[3,1,2]=>[6,2,4]=>[8,3,4]=>[5,2,3,1,6,2,8,3,4]
function sortArray(arr) {
  let lastArr = []
  let len = arr.length
  while (arr.length > 0) {
    // 删除原数组前三位,并将其排序
    let newArr = sort3Number(arr.splice(0, 3))
    // push 前两位到最终数组
    lastArr.push(...newArr.slice(0, 2))
    // 将排序好的最后一位添加到原数组
    arr.unshift(newArr.pop())
    // 终止条件
    if (lastArr.length === len) {
      break
    }
  }
  return lastArr
}
function sort3Number(arr) {
  if (arr.length < 3) return arr.sort((a, b) => b - a)
  const max = Math.max.apply(null, arr)
  const min = Math.min.apply(null, arr)
  const mid = arr.find((item) => item !== max && item !== min) || min
  return [max, min, mid]
}
console.log(sortArray([2, 3, 5, 1, 2, 4, 6, 8, 3, 9, 1, 1, 2, 1, 1]))
function sortNum(arr) {
  let max = Math.max(arr[0], arr[1])
  let min = Math.min(arr[0], arr[1])
  let mid = arr[2]
  if (arr[2] > max) {
    max = arr[2]
    mid = Math.max(arr[0], arr[1])
  }
  if (arr[2] < min) {
    min = arr[2]
    mid = Math.min(arr[0], arr[1])
  }
  return [max, min, mid]
}
console.log(sortNum([3, 2, 5]))
