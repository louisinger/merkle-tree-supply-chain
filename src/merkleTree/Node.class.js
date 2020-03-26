import hash from '../hash.utils'
import { isString } from './utils'

export default class Node {
  /**
   * Node constructor.
   * @param {Node | String} left the left children of the node.
   * @param {Node} right the right children of the node.
   */
  constructor (left, right = null) {
    if (isString(left) && !right) {
      this.left = null
      this.right = null
      this.leafData = hash(this.left)
    } else if (left instanceof Node && right instanceof Node) {
      this.left = left
      this.right = right
    } else {
      throw new Error('Malformed Node !')
    }
  }

  get data () {
    if (this.isLeaf) return this.leafData
    return hash(this.left.data + this.right.data)
  }

  get isLeaf () {
    if (!this.right && !this.left) return true
    if (this.right instanceof Node && this.left instanceof Node) return false
    throw new Error('Malformed Node !')
  }
}
