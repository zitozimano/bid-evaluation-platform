import { computeWeightedScore } from "../src/evaluation/scoring";
import { describe, it, expect } from "vitest";

describe("computeWeightedScore", () => {
  it("applies weight correctly", () => {
    expect(computeWeightedScore(80, 50)).toBe(40);
  });
});
