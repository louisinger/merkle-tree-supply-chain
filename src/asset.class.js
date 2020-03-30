import hash from './hash.utils'
import Node from './merkleTree/Node.class'
import { getMerkleRootNode } from './merkleTree/utils'

export default class Asset {
  /**
   * Asset constructor.
   * @param {Object} type the assets' characteristics (color, shape etc...)
   * @param {Array<Asset>} initialAssets the initial assets.
   */
  constructor (type, initialAssets = []) {
    this.type = type
    initialAssets.length > 0 ? this.assets = {} : this.assets = null
    initialAssets.forEach((asset) => {
      if (this.assets[asset.hashType]) this.assets[asset.hashType].push(asset)
      else this.assets[asset.hashType] = [asset]
    }, {})
  }

  /**
   * Add an asset.
   * @param {Asset!} asset an asset to add.
   */
  add (asset) {
    if (this.assets[asset.hashType]) this.assets[asset.hashType].push(asset)
    else this.assets[asset.hashType] = [asset]
  }

  /** Returns the hash of the type. */
  get hashType () {
    return hash(JSON.stringify(this.type)).toString()
  }

  /**
   * Getter, return true if the asset does not contains others assets.
   */
  get isItem () {
    return this.assets === null
  }

  /** Returns the merkle root node of the asset */
  get node () {
    if (this.isItem) return new Node(this.hashType)
    const assetsNodes = []
    Object.keys(this.assets).forEach(key => {
      const root = getMerkleRootNode(this.assets[key].map(asset => asset.node))
      assetsNodes.push(root)
    })
    const assetsRootNode = getMerkleRootNode(assetsNodes)
    return getMerkleRootNode([new Node(this.hashType), assetsRootNode])
  }

  toString () {
    return `__Asset__\nhash: ${this.hash}\ncharacteristics: ${JSON.stringify(this.characteristics)}\nassets: ${this.assets ? this.assets.map(a => a.hash) : 'NULL'}`
  }
}
