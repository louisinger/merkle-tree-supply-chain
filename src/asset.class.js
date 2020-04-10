import hash from './hash.utils'
import Node from './merkleTree/Node.class'
import { getMerkleRootNode, sign } from './merkleTree/utils'

export default class Asset {
  /**
   * Asset constructor.
   * @param {Object!} type the assets' characteristics (color, shape etc...)
   * @param {Number!} timestamp the creation timestamp of the asset.
   * @param {crypto.KeyLike!} privateKey used to sign the asset.
   * @param {Array<Asset>} initialAssets the initial assets.
   */
  constructor (type, timestamp, privateKey, initialAssets = []) {
    // hash the asset type
    this.type = hash(JSON.stringify(type)).toString()
    // sort the initial assets by type
    initialAssets.length > 0 ? this.assets = {} : this.assets = null
    initialAssets.forEach((asset) => {
      if (this.assets[asset.type]) this.assets[asset.type].push(asset)
      else this.assets[asset.type] = [asset]
    }, {})

    // create the signature
    const caracteristicsNode = getMerkleRootNode([new Node(this.type), new Node(hash(timestamp).toString())])
    const signature = sign(caracteristicsNode.data.toString(), privateKey)
    // generate the type node
    this.definitionNode = new Node(caracteristicsNode, new Node(signature, null, true))
  }

  /**
   * Add an asset.
   * @param {Asset!} asset an asset to add.
   */
  add (asset) {
    if (this.assets[asset.type]) this.assets[asset.type].push(asset)
    else this.assets[asset.type] = [asset]
  }

  /** Getter, return true if the asset does not contains others assets. */
  get isItem () {
    return this.assets === null
  }

  /** Returns the merkle root node of the asset */
  get node () {
    if (this.isItem) return this.definitionNode
    const assetsNodes = []
    Object.keys(this.assets).forEach(key => {
      const root = getMerkleRootNode(this.assets[key].map(asset => asset.node))
      assetsNodes.push(root)
    })
    const assetsRootNode = getMerkleRootNode(assetsNodes)
    return getMerkleRootNode([this.definitionNode, assetsRootNode])
  }
}
