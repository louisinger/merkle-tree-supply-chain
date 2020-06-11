import { SHA256 } from '../hash.utils'
import { isString } from './utils'

export default class Node {
  /**
   * Node constructor.
   * @param {Node | String} left the left children of the node.
   * @param {Node} right the right children of the node.
   * @param {Boolean} signatureData is a signature data.
   */
  constructor (left, right = null, IsSignature = false) {
    if (isString(left) && !right) {
      this.left = null
      this.right = null
      /**
       * If the leaf is a signature, do not hash the data.
       */
      this.leafData = IsSignature ? left : SHA256(left)
    } else if (left instanceof Node && right instanceof Node) {
      this.left = left
      this.right = right
    } else {
      throw new Error('Malformed Node !')
    }
  }

  /**
   * Generate the tree string.
   * @param {Number} layer layer number using to manage indentation.
   */
  treeString (layer = 0) {
    const indentString = ' '
    if (this.isLeaf) return `\n${indentString.repeat(layer)}┗${this.data}`
    return `\n${layer === 0 ? '.' : indentString.repeat(layer) + '┗'}${this.data}${this.left.treeString(layer + 1)}${this.right.treeString(layer + 1)}`
  }

  /**
   * Print the tree string of the node.
   */
  print (f = console.log) {
    f(this.treeString())
  }

  /** getter for the node's data */
  get data () {
    if (this.isLeaf) return this.leafData
    return SHA256(this.left.data + this.right.data)
  }

  /** getter returning true if the node is a leaf */
  get isLeaf () {
    if (!this.right && !this.left) return true
    if (this.right instanceof Node && this.left instanceof Node) return false
    throw new Error('Malformed Node ! I can\'t test the node...')
  }
}
