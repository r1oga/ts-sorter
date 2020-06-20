import { Sorter } from './Sorter.ts'
import { swapConstructor } from './swap.ts'

export class CharactersCollection extends Sorter {
  constructor(public data: string) {
    super()
  }

  get length(): number {
    return this.data.length
  }

  swap(leftIndex: number): void {
    const chars = this.data.split('')
    swapConstructor<string>(chars)(leftIndex)
    this.data = chars.join('')
  }

  compare(leftIndex: number): boolean {
    const lowerCaseStr = this.data.toLowerCase()
    return lowerCaseStr.charAt(leftIndex) > lowerCaseStr.charAt(leftIndex + 1)
  }
}
