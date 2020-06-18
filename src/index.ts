import { NumbersCollection } from './NumbersCollection.ts'
import { CharactersCollection } from './CharactersCollection.ts'
import { LinkedList } from './LinkedList.ts'

const numbersCollection = new NumbersCollection([10, -9, 3, -7, 1])
console.log('Test numbers collection sorting:')
console.log(numbersCollection.data)
numbersCollection.sort()
console.log(numbersCollection.data)
console.log()

console.log('Test characters collection sorting:')
const charactersCollection = new CharactersCollection('testing')
console.log(charactersCollection.data)
charactersCollection.sort()
console.log(charactersCollection.data)

// console.log('Test linked list sorting:')
// const linkedList = new LinkedList()
// linkedList.add(0)
// linkedList.add(-10)
// linkedList.add(30)
// linkedList.add(5)
// linkedList.print()
// linkedList.sort()
// linkedList.print()
