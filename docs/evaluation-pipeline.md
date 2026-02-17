# Evaluation Pipeline

1. **Input**
   - Tender
   - Bidders
   - EvaluationConfig
   - Technical scores
   - BBBEE data
   - Evidence

2. **Functionality Scoring**
   - Aggregate BidderCriterionScore per bidder
   - Cap at `functionalityMax`
   - Compare to `functionalityPass`
   - Set `qualifies` flag

3. **Price Scoring**
   - Determine minimum valid price per tender
   - Compute `(minPrice / bidderPrice) * priceWeight`

4. **BBBEE Scoring**
   - Map level → points using `bbbeeWeight`

5. **Total Score**
   - If `qualifies`:
     - `totalScore = functionalityScore + priceScore + bbbeePoints`
   - Else:
     - `totalScore = 0`

6. **Persist Results**
   - Upsert `EvaluationResult` per bidder

7. **Ranking**
   - Sort `EvaluationResult` by `totalScore DESC`
   - Assign rank in memory

8. **Runs**
   - Use `EvaluationDocument` with `runNumber` per tender

9. **Analytics**
   - Compliance: `ComplianceItem`
   - Risk: derived from `EvaluationResult`
   - Exceptions: `EvaluationException`
   - Workflow: `WorkflowLog`
