export const ConsolidatedResultsTable = ({ results }) => (
  <table className="min-w-full text-sm">
    <thead>
      <tr>
        <th>Rank</th>
        <th>Bidder</th>
        <th>Functionality</th>
        <th>Price</th>
        <th>Preference</th>
        <th>Total</th>
        <th>Disqualified</th>
      </tr>
    </thead>
    <tbody>
      {results.map((r) => (
        <tr key={r.bidderId}>
          <td>{r.rank}</td>
          <td>{r.bidderName}</td>
          <td>{r.functionalityScore.toFixed(2)}</td>
          <td>{r.priceScore.toFixed(2)}</td>
          <td>{r.preferenceScore.toFixed(2)}</td>
          <td>{r.totalScore.toFixed(2)}</td>
          <td>{r.disqualified ? 'Yes' : 'No'}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
