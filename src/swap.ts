export function swapConstructor<T>(arr: T[]) {
  return (leftIndex: number): void => {
    const leftHand = arr[leftIndex]
    arr[leftIndex] = arr[leftIndex + 1]
    arr[leftIndex + 1] = leftHand
  }
}
