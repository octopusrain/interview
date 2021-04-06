//二叉树节点
function BinaryTree() {
  // 节点结构
  var Node = function (key) {
    this.key = key
    this.left = null
    this.right = null
  }

  //根节点
  var root = null

  //新增节点
  var insertNode = function (node, newNode) {
    //约定右孩子都大于左孩子节点
    if (newNode.key < node.key) {
      if (node.left === null) {
        //没有左孩子，则新增左孩子
        node.left = newNode
      } else {
        //如果有左孩子则递归算法实现插入左孩子节点
        insertNode(node.left, newNode)
      }
    } else {
      //如果有孩子为null，则新增右孩子
      if (node.right === null) {
        node.right = newNode
      } else {
        //如果有左孩子则递归算法实现插入右孩子节点
        insertNode(node.right, newNode)
      }
    }
  }
  // 插入新节点
  this.insert = function (key) {
    //创建节点
    var node = new Node(key)
    if (root === null) {
      //判断是否为根节点
      root = node
    } else {
      // 不是根节点则新增节点
      insertNode(root, node)
    }
  }

  // 中序遍历二叉树
  var traverseNodesLDR = function (node, callback) {
    if (node !== null) {
      traverseNodesLDR(node.left, callback)
      callback(node.key)
      traverseNodesLDR(node.right, callback)
    }
  }
  // 中序遍历算法
  this.LDR = function (callback) {
    traverseNodesLDR(root, callback)
  }

  // 前序遍历二叉树
  var traverseNodesDLR = function (node, callback) {
    if (node !== null) {
      callback(node.key)
      traverseNodesDLR(node.left, callback)
      traverseNodesDLR(node.right, callback)
    }
  }
  //前序遍历算法
  this.DLR = function (callback) {
    traverseNodesDLR(root, callback)
  }

  //后序遍历二叉树
  var traverseNodesLRD = function (node, callback) {
    if (node !== null) {
      traverseNodesLRD(node.left, callback)
      traverseNodesLRD(node.right, callback)
      callback(node.key)
    }
  }
  //后序遍历算法
  this.LRD = function (callback) {
    traverseNodesLRD(root, callback)
  }

  //===================二叉树查找========================
  //遍历左子树
  var traverseLeft = function (node, callback) {
    if (node != null) {
      // 排序二叉树（本demo约定）右子树大于左子树
      if (node.left !== null) {
        traverseLeft(node.left, callback)
      } else {
        // 返回最小值
        callback(node.key)
      }
    } else {
      throw new TypeError('空二叉树')
    }
  }
  //获取最小值
  this.getMinValue = function (callback) {
    traverseLeft(root, callback)
  }

  //遍历右子树
  var traverseRight = function (node, callback) {
    if (node !== null) {
      if (node.right !== null) {
        traverseRight(node.right, callback)
      } else {
        callback(node.key)
      }
    } else {
      throw new TypeError('空二叉树')
    }
  }
  //获取最大值
  this.getMaxValue = function (callback) {
    traverseRight(root, callback)
  }

  // 遍历查找二叉树
  var traverseNode = function (node, key) {
    if (node === null) {
      return false
    }

    if (node.key < key) {
      return traverseNode(node.right, key)
    } else if (node.key > key) {
      return traverseNode(node.left, key)
    } else {
      return true
    }
  }
  //查找指定的值是否在二叉树中
  this.isExitInTree = function (key) {
    return traverseNode(root, key)
  }

  //查询最小节点
  var getMinNode = function (node) {
    if (node !== null) {
      if (node.left !== null) {
        return getMinNode(node.left)
      } else {
        return node
      }
    }
  }

  //删除节点
  var removeNode = function (node, key) {
    if (node === null) {
      return null
    }
    if (key < node.key) {
      node.left = removeNode(node.left, key)
      return node
    } else if (key > node.key) {
      node.right = removeNode(node.right, key)
      return node
    } else {
      //删除节点
      //1、删除没有左右子树的节点
      if (node.left === null && node.right === null) {
        node = null
        return node
      }
      //2、删除只有右子树的节点
      if (node.left === null) {
        node = node.right
        return node
      }
      //3、删除只有左子树的节点
      if (node.right === null) {
        node = node.left
        return node
      }
      //4、删除左右子树都有的节点

      //4.1查找右子树中最小的节点N，
      var minNode = getMinNode(node.right)
      //4.2用N替换需要删除的节点，
      node.key = minNode.key
      //4.3删除右子树最小的节点
      node.right = removeNode(node.right, minNode.key)
      return node
    }
  }

  this.deleteNode = function (key) {
    removeNode(root, key)
  }
}

//构建排序二叉树
var nodes = [6, 2, 3, 4, 9, 8, 7, 12, 1, 22]
var binaryTree = new BinaryTree()
nodes.forEach(function (key) {
  binaryTree.insert(key)
})

//处理节点方法
var callback = function (key) {
  console.log(key)
}
//中序遍历
console.log('中序遍历结果:')
binaryTree.LDR(callback)

//前序遍历
console.log('前序遍历结果：')
binaryTree.DLR(callback)

//后序遍历
console.log('后序遍历结果：')
binaryTree.LRD(callback)

console.log('最大值：')
binaryTree.getMaxValue(callback)

console.log('最小值：')
binaryTree.getMinValue(callback)

console.log('22是否存在二叉树中：' + binaryTree.isExitInTree(22))

console.log('删除节点')
binaryTree.deleteNode(4)
binaryTree.deleteNode(9)
