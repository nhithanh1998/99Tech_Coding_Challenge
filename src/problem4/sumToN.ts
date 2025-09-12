/**
 * Validates that n is a positive integer.
 *
 * @param n - The number to validate.
 * @throws Error if `n` is not a positive integer.
 */
export function validateN(n: number): void {
  if (!Number.isInteger(n) || n <= 0) {
    throw new Error("n must be a positive integer!");
  }
}

/**
 * Solution 1 to calculate the sum of all integers from 1 up to the given positive integer `n`
 * using a for loop.
 *
 * @param n - A positive integer specifying the upper bound of the summation.
 * @returns The sum of numbers from 1 to n.
 * @throws Error if `n` is not a positive integer.
 */
export function sumToNSolutionA(n: number): number {
  validateN(n);
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

/**
 * Solution 2 to calculate the sum of all integers from 1 up to the given positive integer `n`
 * by creating an array and calculating the sum of an array.
 *
 * @param n - A positive integer specifying the upper bound of the summation.
 * @returns The sum of numbers from 1 to n.
 * @throws Error if `n` is not a positive integer.
 */
export function sumToNSolutionB(n: number): number {
  validateN(n);
  return Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a + b);
}

/**
 * Solution 3 to calculate the sum of all integers from 1 up to the given positive integer `n`
 * by using math formula.
 *
 * @param n - A positive integer specifying the upper bound of the summation.
 * @returns The sum of numbers from 1 to n.
 * @throws Error if `n` is not a positive integer.
 */
export function sumToBSolutionC(n: number): number {
  validateN(n);
  return (n * (n + 1)) / 2;
}
