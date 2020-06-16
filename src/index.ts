class Sorter {
  constructor(public collection: number[]) {}

  sort(): void {
    const { length } = this.collection

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (this.collection[j] > this.collection[j + 1]) {
          //  swap
          const leftHand = this.collection[j]
          this.collection[j] = this.collection[j + 1]
          this.collection[j + 1] = leftHand
        }
      }
    }
  }
}

const sorter = new Sorter([12, 3, -7, 1])
sorter.sort()
console.log(sorter.collection)
