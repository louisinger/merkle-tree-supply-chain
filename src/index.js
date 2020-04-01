import Asset from './asset.class'

const pill0 = new Asset({ name: 'pill', type: 'doliprane 500mg' })
const pill1 = new Asset({ name: 'pill', type: 'doliprane 500mg' })
const pill2 = new Asset({ name: 'pill', type: 'doliprane 500mg' })

const pill3 = new Asset({ name: 'pill', type: 'doliprane 1000mg' })
const pill4 = new Asset({ name: 'pill', type: 'doliprane 1000mg' })

const pills = [pill0, pill1, pill2, pill3, pill4]

const box = new Asset({ name: 'box', type: 'doliprane' }, pills)
const batch = new Asset({ name: 'batch', serialNumber: 'xz2' }, [box])

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
