function Node(el) {
  this.el = el
  this.next = null
}
function LinkList() {}
// 1->2->3->null null<-1<-2<-3
function reverseLink(link) {
  let head = link.head
  head.next = null
  while (head) {
    let next = head.next
    next.next = head
    head = next
  }
}
var reverseList = function (head) {
  let pre = null
  while (head) {
    head.next = pre
    pre = head
    head = head.next
  }
  return pre
}
