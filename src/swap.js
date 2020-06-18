export function swap (arr, leftIndex) {
  const leftHand = arr[leftIndex]
  arr[leftIndex] = arr[leftIndex + 1]
  arr[leftIndex + 1] = leftHand
}
