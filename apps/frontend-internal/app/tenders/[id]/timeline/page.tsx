"use client";

import { useEffect, useState } from "react";
import { TenderOverviewHeader } from "@/components/tenders/TenderOverviewHeader";

interface TimelineEvent {
  id: string;
  type: string;
  label: string;
  createdAt: string;
}

interface Tender {
  id: string;
  number: string;
  description: string;
  status: string;
  createdAt: string;
}

async function fetchDetails(id: string): Promise<{
  tender: Tender;
  timeline: TimelineEvent[];
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tenders/${id}/details`,
    { credentials: "include", cache: "no-store" },
  );
  if (!res.ok) throw new Error("Failed to load tender details");
  return res.json();
}

export default function TenderTimelinePage({
  params,
}: {
  params: { id: string };
}) {
  const [tender, setTender] = useState<Tender | null>(null);
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails(params.id)
      .then((data) => {
        setTender(data.tender);
        setEvents(data.timeline);
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading || !tender) {
    return (
      <div className="p-6 text-sm text-slate-600">
        Loading timeline…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <TenderOverviewHeader tender={tender} />

        <div className="bg-white border rounded p-4">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Workflow Timeline
          </h2>

          {events.length === 0 ? (
            <div className="text-sm text-slate-500">
              No timeline events recorded.
            </div>
          ) : (
            <ol className="relative border-l border-slate-200 space-y-4">
              {events.map((e) => (
                <li key={e.id} className="ml-4">
                  <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-indigo-500" />
                  <time className="text-xs text-slate-500">
                    {new Date(e.createdAt).toLocaleString()}
                  </time>
                  <p className="text-sm font-medium text-slate-800">
                    {e.label}
                  </p>
                  <p className="text-xs text-slate-500">{e.type}</p>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
