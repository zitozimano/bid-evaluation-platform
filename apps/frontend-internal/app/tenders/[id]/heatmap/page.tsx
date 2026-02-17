<div className="flex gap-2">
  <a
    href={`${process.env.NEXT_PUBLIC_API_URL}/evaluation/tenders/${params.id}/heatmap.csv`}
    className="px-3 py-2 bg-slate-700 text-white rounded text-xs"
  >
    Export CSV
  </a>
  <a
    href={`${process.env.NEXT_PUBLIC_API_URL}/evaluation/tenders/${params.id}/heatmap.json`}
    className="px-3 py-2 bg-slate-700 text-white rounded text-xs"
  >
    Export JSON
  </a>
</div>
