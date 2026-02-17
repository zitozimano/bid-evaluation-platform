import { ScoringMatrix } from "../src/scoring/ScoringMatrix";

export default {
  title: "Evaluation/Scoring Matrix",
  component: ScoringMatrix
};

export const Example = {
  args: {
    criteria: [
      { id: "1", label: "Price", weight: 60 },
      { id: "2", label: "Functionality", weight: 40 }
    ],
    bids: [
      {
        bidder: "ABC Corp",
        scores: [
          { criterionId: "1", score: 80 },
          { criterionId: "2", score: 90 }
        ],
        total: 84
      }
    ]
  }
};
