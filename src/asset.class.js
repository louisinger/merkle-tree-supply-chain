import hash from './hash.utils'

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

  /**
   * Add an asset.
   * @param {Asset!} asset an asset to add.
   */
  add (asset) {
    this.assets.push(asset)
  }

  /**
   * Returns the hash of the characteristics.
   */
  get hashCharacteristics () {
    return hash(JSON.stringify(this.characteristics))
  }

  /**
   * Getter for the merkle tree of the assets.
   */
  get merkleTree () {

  }

  toString () {
    return `__Asset__\nhash: ${this.hash}\ncharacteristics: ${JSON.stringify(this.characteristics)}\nassets: ${this.assets ? this.assets.map(a => a.hash) : 'NULL'}`
  }
}
