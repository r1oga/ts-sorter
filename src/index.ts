import { NumbersCollection } from './NumbersCollection.ts'
import { Sorter } from './Sorter.ts'

const numberCollection = new NumbersCollection([-9, 3, -7, 1])
const sorter = new Sorter(numberCollection)
console.log(sorter.collection)
sorter.sort()
console.log(sorter.collection)
