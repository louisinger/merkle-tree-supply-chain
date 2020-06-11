import { newKeyPairs } from './merkleTree/utils'
import { newAsset, getRoot } from './asset'

console.log('creating objects...')

// a user represented as a keypair.
const user = newKeyPairs()

const pill0 = newAsset({ name: 'pill', type: 'doliprane 500mg' }, user.privateKey)
const pill1 = newAsset({ name: 'pill', type: 'doliprane 500mg' }, user.privateKey)

const pills = [pill0, pill1]

const batch = newAsset({ name: 'batch', serialNumber: 'xz2' }, user.privateKey, pills)

getRoot(pill0).print()
getRoot(batch).print()
