erDiagram

  User {
    string id
    string email
    string name
    string role
    string password
  }

  Tender {
    string id
    string title
    string description
    string status
    int    bbbeeWeight
  }

  Bidder {
    string  id
    string  tenderId
    string  name
    decimal price
    int     bbbeeLevel
  }

  EvaluationCriteria {
    string id
    string tenderId
    string name
    float  weight
    float  minimumScore
    string type
  }

  EvaluatorAssignment {
    string id
    string tenderId
    string evaluatorId
  }

  EvaluatorScore {
    string id
    string evaluatorId
    string bidderId
    string criteriaId
    string tenderId
    float  score
    string comment
  }

  ConsolidatedScore {
    string id
    string bidderId
    string tenderId
    float  functionalityScore
    float  priceScore
    float  preferenceScore
    float  totalScore
    int    rank
  }

  EvaluationAuditTrail {
    string   id
    string   tenderId
    string   userId
    string   action
    datetime timestamp
    json     metadata
  }

  Tender ||--o{ Bidder : "has bidders"
  Tender ||--o{ EvaluationCriteria : "has criteria"
  Tender ||--o{ EvaluatorAssignment : "has assignments"
  Tender ||--o{ EvaluatorScore : "has scores"
  Tender ||--o{ ConsolidatedScore : "has consolidated scores"
  Tender ||--o{ EvaluationAuditTrail : "has audit trail"

  Bidder ||--o{ EvaluatorScore : "has scores"
  Bidder ||--|| ConsolidatedScore : "has consolidated score"

  EvaluationCriteria ||--o{ EvaluatorScore : "has scores"

  User ||--o{ EvaluationAuditTrail : "performs actions"
