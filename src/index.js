import Node from './merkleTree/Node.class'
import { getMerkleRootNode } from './merkleTree/utils'
/**
const pill0 = new Asset({ name: 'pill', type: 'doliprane 500mg' })
const pill1 = new Asset({ name: 'pill', type: 'doliprane 500mg' })
const pill2 = new Asset({ name: 'pill', type: 'doliprane 1000mg' })

const pills = [pill0, pill1]

const box = new Asset({ name: 'box', type: 'doliprane' }, pills)

console.log(box.merkleTree.print())

box.add(pill2)

console.log(box.merkleTree.print())
*/
const dataBlocks = ['data0', 'data1', 'data2', 'data3', 'data4', 'data5', 'data3', 'data4', 'data5']

const leaves = dataBlocks.map(data => new Node(data))
const root = getMerkleRootNode(leaves)
