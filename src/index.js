import Asset from './asset.class'

const pill0 = new Asset({ name: 'pill', type: 'doliprane 500mg' })
const pill1 = new Asset({ name: 'pill', type: 'doliprane 500mg' })
const pill2 = new Asset({ name: 'pill', type: 'doliprane 500mg' })
const pill3 = new Asset({ name: 'pill', type: 'doliprane 1000mg' })
const pill4 = new Asset({ name: 'pill', type: 'doliprane 1000mg' })

const pills = [pill0, pill1]

const box = new Asset({ name: 'box', type: 'doliprane' }, pills)
const batch = new Asset({ name: 'batch', serialNumber: 'xz2' }, [box])

box.node.print()
console.log('\nbatch ---')
batch.node.print()
box.add(pill2)

box.node.print()

box.add(pill3)

box.node.print()

box.add(pill4)

box.node.print()
