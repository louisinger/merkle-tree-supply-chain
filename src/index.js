import Asset from './asset.class'

const pill0 = new Asset({ name: 'pill', type: 'doliprane 500mg' })
const pill1 = new Asset({ name: 'pill', type: 'doliprane 500mg' })
/**
const pill2 = new Asset({ name: 'pill', type: 'doliprane 1000mg' })

*/
const pills = [pill0, pill1]
const box = new Asset({ name: 'box', type: 'doliprane' }, pills)
console.log('==== BOX NODE ====')
console.log(box.node)
