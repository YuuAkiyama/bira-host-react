export function padZero(number: number, maxDigit: number): string {
  let result = `${number}`
  while (result.length < maxDigit) {
    result = `0${result}`
  }
  return result
}
