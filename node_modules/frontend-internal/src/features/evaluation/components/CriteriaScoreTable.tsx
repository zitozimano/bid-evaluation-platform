export const CriteriaScoreTable = ({
  criteria,
  scores,
  updateScore,
  updateComment,
}) => (
  <table className="min-w-full text-sm">
    <thead>
      <tr>
        <th>Criteria</th>
        <th>Type</th>
        <th>Weight</th>
        <th>Minimum</th>
        <th>Score</th>
        <th>Comment</th>
      </tr>
    </thead>
    <tbody>
      {criteria.map((c) => (
        <tr key={c.id}>
          <td>{c.name}</td>
          <td>{c.type}</td>
          <td>{c.weight}</td>
          <td>{c.minimumScore ?? '-'}</td>
          <td>
            <input
              type="number"
              className="border px-1 py-0.5 w-20"
              value={scores[c.id]?.score ?? ''}
              onChange={(e) => updateScore(c.id, Number(e.target.value))}
            />
          </td>
          <td>
            <input
              type="text"
              className="border px-1 py-0.5 w-full"
              value={scores[c.id]?.comment ?? ''}
              onChange={(e) => updateComment(c.id, e.target.value)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
