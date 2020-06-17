interface Sortable {
  length: number
  compare(leftIndex: number): boolean
  swap(leftIndex: number): void
}

export class Sorter {
  constructor(public collection: Sortable) {}

  sort(): void {
    const { length } = this.collection

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (this.collection.compare(j)) {
          this.collection.swap(j)
        }
      }
    }
  }
}
