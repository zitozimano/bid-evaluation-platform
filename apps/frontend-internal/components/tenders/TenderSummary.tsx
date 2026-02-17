<div className="flex flex-wrap gap-3 pt-2">
  <a
    href={`${process.env.NEXT_PUBLIC_API_URL}/tenders/${tender.id}/council-pack.pdf`}
    className="px-3 py-2 bg-blue-600 text-white rounded text-sm"
  >
    Download Council Pack
  </a>

  <a
    href={`${process.env.NEXT_PUBLIC_API_URL}/tenders/${tender.id}/evaluation-pack.zip`}
    className="px-3 py-2 bg-green-600 text-white rounded text-sm"
  >
    Download Evaluation Pack
  </a>

  <a
    href={`${process.env.NEXT_PUBLIC_API_URL}/public/verification/certificate.pdf?tenderNo=${encodeURIComponent(
      tender.number,
    )}&hash=TODO_HASH`}
    className="px-3 py-2 bg-slate-700 text-white rounded text-sm"
  >
    Download Verification Certificate
  </a>
</div>
