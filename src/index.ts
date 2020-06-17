import { NumbersCollection } from './NumbersCollection.ts'
import { CharactersCollection } from './CharactersCollection.ts'

import { Sorter } from './Sorter.ts'

const numbersCollection = new NumbersCollection([10, -9, 3, -7, 1])
const charactersCollection = new CharactersCollection('testing')
const sorterNum = new Sorter(numbersCollection)
console.log('Test numbers collection sorting:')
console.log(sorterNum.collection)
sorterNum.sort()
console.log(sorterNum.collection)
console.log()

const sorterChar = new Sorter(charactersCollection)
console.log('Test characters collection sorting:')
console.log(sorterChar.collection)
sorterChar.sort()
console.log(sorterChar.collection)
