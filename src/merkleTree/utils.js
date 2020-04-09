import Node from './Node.class'
import crypto from 'crypto'

/**
 * Check if the value given as parameter is a String or not.
 * @param {any!} value value to test.
 */
export function isString (value) {
  return typeof value === 'string' || value instanceof String
}

/**
 * return the root node of a list of leaves.
 * @param {Node[]} nodes array of nodes.
 */
export function getMerkleRootNode (nodes) {
  // the stop cases
  if (nodes.length === 0) throw new Error('nodes array cannot be empty')
  if (nodes.length === 1) return nodes[0]
  if (nodes.length === 2) return new Node(nodes[0], nodes[1])
  // the continue cases
  const newNodesArray = []
  if (nodes.length % 2 === 1) newNodesArray.push(nodes.pop())
  // iterate through the nodes array an reduce it by creating new nodes.
  for (let i = 0; i < nodes.length; i = i + 2) {
    newNodesArray.unshift(new Node(nodes[i], nodes[i + 1]))
  }
  return getMerkleRootNode(newNodesArray)
}

/**
 * Sign a data using a privateKey.
 * @param {String!} data encoded data.
 * @param {crypto.KeyLike!} privateKey the private key using to sign data.
 */
export function sign (data, privateKey) {
  const sign = crypto.createSign('SHA256')
  sign.update(data)
  sign.end()
  const res = sign.sign(privateKey, 'hex')
  return res
}

/**
 * Create a new keyPairs using the sect239k1 elliptic curve.
 */
export function newKeyPairs () {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
    namedCurve: 'sect239k1',
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'sec1', format: 'pem' }
  })
  return { privateKey, publicKey }
}

/**
 * Verify the signature using the public key.
 * @param {String!} data a signed data.
 * @param {String!} signature the signature to verify.
 * @param {crypto.KeyLike!} publicKey the public key object.
 */
export function verify (data, signature, publicKey) {
  const verifyObject = crypto.createVerify('SHA256')
  verifyObject.update(data)
  verifyObject.end()
  return verifyObject.verify(publicKey, signature, 'hex')
}
