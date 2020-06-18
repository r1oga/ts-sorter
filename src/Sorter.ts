interface Sortable {
  compare(leftIndex: number): boolean
  swap(leftIndex: number): void
  length: number
}

export abstract class Sorter implements Sortable {
  sort(): void {
    for (let i = 0; i < this.length; i++) {
      for (let j = 0; j < this.length; j++) {
        if (this.compare(j)) {
          this.swap(j)
        }
      }
    }
  }
  abstract compare(index: number): boolean
  abstract swap(index: number): void
  abstract length: number
}
