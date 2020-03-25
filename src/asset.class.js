import sha256 from 'crypto-js/sha256'
import { MerkleTree } from 'merkletreejs'

export default class Asset {
  /**
   * Asset constructor
   * @param {Object} characteristics the assets' characteristics (color, type etc...)
   * @param {Array<Asset>} assets the assets which compose the 'this' asset.
   */
  constructor (characteristics, assets = null) {
    this.characteristics = characteristics
    this.assets = assets
  }

  get hash () {
    return sha256(JSON.stringify(this)).toString()
  }

  get merkleTree () {
    const hashCharacteristics = sha256(JSON.stringify(this.characteristics)).toString()
    const leaves = [hashCharacteristics]
    if (this.assets) {
      leaves.push(
        new MerkleTree([...this.assets.map(asset => asset.merkleTreeRoot)], sha256)
          .getRoot()
          .toString('hex')
      )
    }
    return new MerkleTree(leaves, sha256)
  }

  get merkleTreeRoot () {
    return this.merkleTree.getRoot().toString('hex')
  }

  toString () {
    return `__Asset__\nhash: ${this.hash}\ncharacteristics: ${JSON.stringify(this.characteristics)}\nassets: ${this.assets ? this.assets.map(a => a.hash) : 'NULL'}`
  }
}
