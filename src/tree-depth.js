var widthOfBinaryTree2 = function(root) {
  if (!root) return 0

  var res = [],
    maxWidth = 1
  recusion(root, 0, 0)
  return maxWidth

  function recusion(root, level, num) {
    if (res[level]) {
      res[level].push(num)
    } else {
      res[level] = [num]
    }

    //计算最大宽度
    var tempArr = res[level]
    var tempWidth = tempArr[tempArr.length - 1] - tempArr[0] + 1
    if (tempWidth > maxWidth) {
      maxWidth = tempWidth
    }

    if (root.left) {
      recusion(root.left, level + 1, num * 2 + 1)
    }
    if (root.right) {
      recusion(root.right, level + 1, num * 2 + 2)
    }
  }
}
var maxDepth = function(root) {
  if (!root) {
    return 0
  } else {
    const left = maxDepth(root.left)
    const right = maxDepth(root.right)
    return Math.max(left, right) + 1
  }
}
function isTrueStr(str) {
  let map = {
    '(': ')',
    '[': ']',
    '{': '}',
  }
  let quequ = []
  for (let i = 0; i < str.length; i++) {
    if (map[str[i]]) {
      quequ.push(str[i])
    } else {
      if (str[i] !== map[quequ.pop()]) {
        return false
      }
    }
  }
  if (quequ.length) {
    return false
  } else {
    return true
  }
}
console.log(isTrueStr('([[]])'))
// 两数之和
function sum2(arr, n) {
  let map = {}
  for (let i in arr) {
    let spanI = n - arr[i]
    if (spanI in map) {
      return [i, arr[i]]
    } else {
      map[arr[i]] = i
    }
  }
  return -1
}
console.log(sum2([1, 2, 3, 0, -1, -3], 0))
