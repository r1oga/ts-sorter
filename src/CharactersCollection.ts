export class CharactersCollection {
  constructor(public data: string) {}

  get length(): number {
    return this.data.length
  }

  swap(leftIndex: number): void {
    const chars = this.data.split('')
    const leftHand = chars[leftIndex]
    chars[leftIndex] = chars[leftIndex + 1]
    chars[leftIndex + 1] = leftHand
    this.data = chars.join('')
  }

  compare(leftIndex: number): boolean {
    const lowerCaseStr = this.data.toLowerCase()
    return lowerCaseStr.charAt(leftIndex) > lowerCaseStr.charAt(leftIndex + 1)
  }
}
