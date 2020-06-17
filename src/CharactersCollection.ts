export class CharactersCollection {
  constructor(public str: string) {}

  get length(): number {
    return this.str.length
  }

  swap(leftIndex: number): void {
    const chars = this.str.split('')
    const leftHand = chars[leftIndex]
    chars[leftIndex] = chars[leftIndex + 1]
    chars[leftIndex + 1] = leftHand
    this.str = chars.join('')
  }

  compare(leftIndex: number): boolean {
    const lowerCaseStr = this.str.toLowerCase()
    return lowerCaseStr.charAt(leftIndex) > lowerCaseStr.charAt(leftIndex + 1)
  }
}
