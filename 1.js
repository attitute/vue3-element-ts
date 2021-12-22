/* eslint-disable no-unused-expressions */

var preorder = function(root) {
  const stack = [] // 队列
  const output = [] //
  if (root == null) return output
  stack.push(root) // 进队列
  while (stack.length) { // 栈里面有数据
    const node = stack.pop() // 队列 3
    output.push(node.val) // 存数据 1 3
    node.children.reverse() // 4 2 3   5 6
    stack.push(...node.children) // [4,2,3] [4,2,6,5]
  }
  return output
}
// 输入：root = [1,null,3,2,4,null,5,6]
// 输出：[1,3,5,6,2,4]
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
function preorder1(root) {
  if (!root) return []
  const res = []
  const inPreorder = (root) => {
    if (!root) return
    res.push(root.val)
    for (let i = 0; i < root.children.length; i++) {
      inPreorder(root.children[i])
    }
  }
  inPreorder(root)
  return res
}

// 输入：root = [1,null,3,2,4,null,5,6]
// 输出：[1,3,5,6,2,4]

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
// 思路： root根节点  left变成right  深度优先  最底下node进行left right替换

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
  const queue = [] // 先进先出
  queue.push(root)
  while (queue.length) {
    const node = queue.shift()
    const temp = node.left
    node.left = node.right
    node.right = temp
    if (node.left !== null) {
      queue.push(node.left)
    }
    if (node.right !== null) {
      queue.push(node.right)
    }
  }

  return root
}

// [3,9,20,null,null,15,7],

var invertTree1 = function(root) {
  const res = []
  const queue = []
  queue.push(root)
  while (queue.length) {
    const arr = []
    for (let i = queue.length; i > 0; i++) {
      const node = queue.shift()
      arr.push(node.val)
      node.left ? queue.push(node.left) : null
      node.right ? queue.push(node.right) : null
    }
    res.push(arr)
  }
  return res
}

var invertTree2 = function(root) {
  const res = []
  const arr = []
  function loop(node, h) {
    if (!node) return node
    if (!arr[h]) arr[h] = []
    arr[h].push(node.val)
    loop(node.left, h + 1)
    loop(node.right, h + 1)
  }
  loop(root, 0)
  return res
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
  const stack = []

  while (stack) {

  }
}




console.log(3%2 === 0)
