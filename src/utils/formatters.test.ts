import { describe, it, expect } from "vitest";
import { formatGoalDifference, getGoalDifferenceColor } from "./formatters";

describe("formatGoalDifference", () => {
  it("adds + prefix to positive numbers", () => {
    expect(formatGoalDifference(10)).toBe("+10");
    expect(formatGoalDifference(1)).toBe("+1");
  });

  it("keeps negative numbers as-is", () => {
    expect(formatGoalDifference(-5)).toBe("-5");
  });

  it('returns "0" for zero', () => {
    expect(formatGoalDifference(0)).toBe("0");
  });
});

describe("getGoalDifferenceColor", () => {
  it("returns green for positive GD", () => {
    expect(getGoalDifferenceColor(15)).toBe("text-green-400");
  });

  it("returns red for negative GD", () => {
    expect(getGoalDifferenceColor(-3)).toBe("text-red-400");
  });

  it("returns gray for zero", () => {
    expect(getGoalDifferenceColor(0)).toBe("text-gray-400");
  });
});
