import Asset from './asset.class'
import { newKeyPairs, verify } from './merkleTree/utils'

console.log('creating objects...')

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

console.log('objects created.')

console.log('results:')
console.log('\n--- box ---')
box.node.print()
console.log('\n--- batch ---')
batch.node.print()
console.log('\nVerify signature:')
console.log(`public key: \n${user.publicKey}`)

// get signature and signed data
const batchDefinitionNode = batch.node.left
const batchCaracteristicsNode = batchDefinitionNode.left
const batchSignatureNode = batchDefinitionNode.right

// verify the signature
const isVerified = verify(batchCaracteristicsNode.data, batchSignatureNode.data, user.publicKey)

console.log(`Verification: ${isVerified}`)
