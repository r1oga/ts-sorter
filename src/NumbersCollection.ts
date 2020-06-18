import { Sorter } from './Sorter.ts'

export class NumbersCollection extends Sorter {
  constructor(public data: number[]) {
    super()
  }

  get length(): number {
    return this.data.length
  }

  swap(leftIndex: number): void {
    const leftHand = this.data[leftIndex]
    this.data[leftIndex] = this.data[leftIndex + 1]
    this.data[leftIndex + 1] = leftHand
  }

  compare(leftIndex: number): boolean {
    return this.data[leftIndex] > this.data[leftIndex + 1]
  }
}
