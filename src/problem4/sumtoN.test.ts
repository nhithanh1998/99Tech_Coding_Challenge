import {
  validateN,
  sumToNSolutionA,
  sumToNSolutionB,
  sumToBSolutionC,
} from "./sumToN";

describe("validateN", () => {
  it("should not throw for a valid positive integer", () => {
    expect(() => validateN(5)).not.toThrow();
    expect(() => validateN(1)).not.toThrow();
  });

  it("should throw for non-integers", () => {
    expect(() => validateN(3.5)).toThrow("n must be a positive integer!");
    expect(() => validateN(NaN)).toThrow("n must be a positive integer!");
  });

  it("should throw for zero or negative numbers", () => {
    expect(() => validateN(0)).toThrow("n must be a positive integer!");
    expect(() => validateN(-1)).toThrow("n must be a positive integer!");
  });
});

const sumFunctions = [sumToNSolutionA, sumToNSolutionB, sumToBSolutionC];

describe.each(sumFunctions)("sumToN implementations", (sumFn) => {
  it("should return 1 when n = 1", () => {
    expect(sumFn(1)).toBe(1);
  });

  it("should calculate correct sum for small numbers", () => {
    expect(sumFn(3)).toBe(6); // 1 + 2 + 3
    expect(sumFn(5)).toBe(15); // 1 + 2 + 3 + 4 + 5
  });

  it("should calculate correct sum for larger numbers", () => {
    expect(sumFn(100)).toBe(5050);
    expect(sumFn(1000)).toBe(500500);
  });

  it("should throw for invalid n", () => {
    expect(() => sumFn(0)).toThrow("n must be a positive integer!");
    expect(() => sumFn(-10)).toThrow("n must be a positive integer!");
    expect(() => sumFn(2.5)).toThrow("n must be a positive integer!");
  });
});
