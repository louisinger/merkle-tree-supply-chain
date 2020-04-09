/**
 * @file A test scenario for merkle tree asset model.
 * @author Louis Singer
 */

import Asset from '../asset.class'

/**
 * Represent a public registry using to record all the transactions.
 * @type {Array<{from: String!, to: String!, amount: Number!, assetRootHash: String!}>}
 */
const transactions = []

/**
 * @param {String} from the sender of the asset(s).
 * @param {String!} to the receiver of the asset(s).
 * @param {Number!} amount the number of asset transfered.
 * @param {Asset!} asset the asset transfered.
 */
function newTransaction (from, to, amount, asset) {
  transactions.push({ from, to, amount, assetRootHash: asset.node.data })
}

const doctorAccount = 'doctor'
const patientAccountA = 'patientA'
const patientAccountB = 'patientB'

// Create the assets object
const dolipranePill = new Asset({ is: 'pill', type: 'doliprane 500mg' })
const aspirinePill = new Asset({ is: 'pill', type: 'aspirine 120g' })

// create the boxes: PUBLIC INFORMATIONS
const boxDolipranes = new Asset({ is: 'box', id: 'dolipraneBox' }, Array(10).fill(dolipranePill))
// boxDolipranes.node.print()
const boxAspirines = new Asset({ is: 'box', id: 'aspirineBox' }, Array(10).fill(aspirinePill))
// boxAspirines.node.print()

const doctorBatch = new Asset({ is: 'batch', id: 'batch0' }, [boxDolipranes, boxAspirines])
doctorBatch.node.print()

// MODELIZE THE TRANSACTIONS
newTransaction(doctorAccount, patientAccountB, 1, dolipranePill)
newTransaction(doctorAccount, patientAccountA, 9, dolipranePill)
newTransaction(doctorAccount, patientAccountA, 1, boxAspirines)

console.log(transactions.map(t => `${t.from} -> ${t.to} [${t.amount} ${t.assetRootHash}]`))
