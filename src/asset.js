import { objectSHA256 } from './hash.utils'
import { sign, getMerkleRootNode } from './merkleTree/utils'
import Node from './merkleTree/Node.class'

/**
 * Check if the object given as parameter is an asset.
 */
export function isAsset (obj) {
  return (obj.definitionNode instanceof Node) && (obj.contentNode === null || obj.contentNode instanceof Node)
}

/**
 * Create a new asset.
 * @param {object!} features the object describing the assset's feature.
 * @param {crypto.KeyLike!} privateKey the private key of the asset's producer.
 * @param {object[]} assets optionnal - the asset's content = a list of other assets.
 */
export function newAsset (features, privateKey, assets = []) {
  const type = objectSHA256(features)
  const signature = sign(type, privateKey)
  const definitionNode = getMerkleRootNode([new Node(type), new Node(signature, null, true)])
  const contentNode = assets.length === 0 ? null : getMerkleRootNode(assets.map(getRoot))
  return { definitionNode, contentNode }
}

/**
 * Compute the Merkle Root of an asset given as parameter.
 * @param {object!} asset the asset to compute.
 */
export function getRoot (asset) {
  if (!isAsset(asset)) throw new Error('Type error: asset must be a valid asset object')
  if (asset.contentNode === null) return asset.definitionNode
  return getMerkleRootNode([asset.definitionNode, asset.contentNode])
}
