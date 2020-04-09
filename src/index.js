import Asset from './asset.class'
import { newKeyPairs } from './merkleTree/utils'

// a user represented as a keypair.
const user = newKeyPairs()
// the timestamp should be stored somewhere by the user.
const nowTimestamp = Date.now()

const pill0 = new Asset({ name: 'pill', type: 'doliprane 500mg' }, nowTimestamp, user.privateKey)
const pill1 = new Asset({ name: 'pill', type: 'doliprane 500mg' }, nowTimestamp, user.privateKey)
const pill2 = new Asset({ name: 'pill', type: 'doliprane 500mg' }, nowTimestamp, user.privateKey)

const pill3 = new Asset({ name: 'pill', type: 'doliprane 1000mg' }, nowTimestamp, user.privateKey)
const pill4 = new Asset({ name: 'pill', type: 'doliprane 1000mg' }, nowTimestamp, user.privateKey)

const pills = [pill0, pill1, pill2, pill3, pill4]

const box = new Asset({ name: 'box', type: 'doliprane' }, nowTimestamp, user.privateKey, pills)
const batch = new Asset({ name: 'batch', serialNumber: 'xz2' }, nowTimestamp, user.privateKey, [box])

console.log('\n--- box ---')
box.node.print()
console.log('\n--- batch ---')
batch.node.print()

/**
// We have three pieces of data
const data = ['a', 'b', 'c']
// Transform them into leaves: 'A', 'B' and 'C'
const leaves = data.map(pieceOfData => new Node(pieceOfData))
// Call the merkle root function
const merkleRoot = getMerkleRootNode(leaves)
// Print the tree
merkleRoot.print()
*/
