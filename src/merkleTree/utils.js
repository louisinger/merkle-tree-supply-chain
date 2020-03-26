import Node from './Node.class'

export function isString (value) {
  return typeof value === 'string' || value instanceof String
}

/**
 * return the root node of a list of leaves.
 * @param {Node[]} nodes array of nodes.
 */
export function getMerkleRootNode (nodes) {
  // the stop cases
  console.log('--------------------------')
  console.log(nodes)
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
