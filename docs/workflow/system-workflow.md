# Bid Evaluation Platform – System Workflow

## 1. Tenant & User Setup

**Actors:** System Admin  
**Tables:** `Tenant`, `TenantBranding`, `User`

- Create tenant and branding.
- Create users (SCM, CFO, Audit, Admin) and assign roles.

**Output:** Tenant and users ready to operate.

---

## 2. Tender Creation

**Actors:** SCM / Admin  
**Tables:** `Tender`, `ScmTenderAssignment`

- Create tender (number, description, category).
- Assign SCM officials to tender.

**Output:** Tender active and ready for bidders.

---

## 3. Bidder Registration

**Actors:** SCM  
**Tables:** `Bidder`, `Evidence`, `Bbbee`

- Capture bidder details and price.
- Upload evidence.
- Capture BBBEE level and expiry.

**Output:** Bidders registered and linked to tender.

---

## 4. Evaluation Configuration

**Actors:** SCM / Admin  
**Tables:** `EvaluationConfig`

- Set functionality pass and max.
- Set price and BBBEE weights.
- Define criteria JSON.

**Output:** Evaluation rules configured.

---

## 5. Technical Scoring

**Actors:** Technical Committee / SCM  
**Tables:** `BidderCriterionScore`

- Capture rawScore, scaleMax, weight, criterionCode per bidder.

**Output:** Functionality scoring data ready.

---

## 6. Run Evaluation Engine

**Actors:** System (triggered by SCM)  
**Tables:** `EvaluationResult`, `ComplianceItem`, `EvaluationException`, `EvaluationDocument`

- Compute functionality, price, BBBEE, total scores.
- Determine qualification.
- Generate compliance items and exceptions.
- Generate evaluation document and hash.

**Output:** EvaluationResult rows and evaluation document created.

---

## 7. Workflow Logging

**Actors:** SCM / CFO / Audit / AO / Council / System  
**Tables:** `WorkflowLog`

Stages:

- A: Technical evaluation completed
- B: Price evaluation completed
- C: BBBEE evaluation completed
- D: Consolidated scoring completed
- E: Internal audit review
- F: CFO review
- G: Final approval
- H: Council submission
- I: Award published

**Output:** Full audit trail of evaluation progress.

---

## 8. Internal Audit Review

**Actors:** Internal Audit  
**Tables:** `EvaluationResult`, `WorkflowLog`

- Review evaluation pack.
- Log stage E.

---

## 9. CFO Review

**Actors:** CFO  
**Tables:** `EvaluationSignature`, `WorkflowLog`

- Review financial and risk posture.
- Sign off and log stage F.

---

## 10. Accounting Officer Approval

**Actors:** AO  
**Tables:** `EvaluationSignature`, `WorkflowLog`

- Final administrative approval.
- Log stage G.

---

## 11. Council Approval & Award

**Actors:** Council  
**Tables:** `WorkflowLog`, `EvaluationSignature`

- Approve award.
- Log stage H and publish award (I).

---

## 12. Public Verification

**Actors:** Public  
**Tables:** `EvaluationDocument`, `EvaluationResult`

- Verify tender using tender number + hash.
- View winning bidder, scores, compliance, exceptions, workflow timeline.

---

## Governance Controls

- Multi-tenant isolation (`Tenant`).
- Role-based access (SCM, Audit, CFO, AO, Council, Public).
- Immutable artefacts (`EvaluationDocument.hash`, `EvaluationResult`).
- Workflow logging (`WorkflowLog`).
- Compliance and exceptions (`ComplianceRule`, `ComplianceItem`, `EvaluationException`).
- Signatures (`EvaluationSignature`).
