import { Sorter } from './Sorter.ts'
import { swapConstructor } from './swap.ts'

export class NumbersCollection extends Sorter {
  constructor(public data: number[]) {
    super()
  }

  get length(): number {
    return this.data.length
  }

  swap(leftIndex: number): void {
    swapConstructor<number>(this.data)(leftIndex)
  }

  compare(leftIndex: number): boolean {
    return this.data[leftIndex] > this.data[leftIndex + 1]
  }
}
