import { NumbersCollection } from './NumbersCollection.ts'
import { CharactersCollection } from './CharactersCollection.ts'
import { LinkedList } from './LinkedList.ts'

import { Sorter } from './Sorter.ts'

// const numbersCollection = new NumbersCollection([10, -9, 3, -7, 1])
// const sorterNum = new Sorter(numbersCollection)
// console.log('Test numbers collection sorting:')
// console.log(sorterNum.collection)
// sorterNum.sort()
// console.log(sorterNum.collection)
// console.log()
//
// console.log('Test characters collection sorting:')
// const charactersCollection = new CharactersCollection('testing')
// const sorterChar = new Sorter(charactersCollection)
// console.log(sorterChar.collection)
// sorterChar.sort()
// console.log(sorterChar.collection)

console.log('Test linked list sorting:')
const linkedList = new LinkedList()
linkedList.add(0)
linkedList.add(-10)
linkedList.add(30)
linkedList.add(5)
const sorterLl = new Sorter(linkedList)
linkedList.print()
sorterLl.sort()
// linkedList.print()
