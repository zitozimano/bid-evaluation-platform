"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  PageShell,
  Card,
  SectionHeader,
  StatusChip,
  Button,
  Select
} from "@bid/ui";

import { useTender } from "@/hooks/useTender";
import {
  fetchTenderDocuments,
  fetchRequiredDocuments,
  uploadTenderDocument
} from "@/lib/api/documents";

const menu = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tenders", href: "/tenders" },
  { label: "Evaluations", href: "/evaluations" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" }
];

const docTypes = [
  { value: "TOR", label: "Terms of Reference" },
  { value: "SPEC", label: "Specification" },
  { value: "BIDDER_DOC", label: "Bidder Document" }
];

export default function TenderDetailPage({ params }: { params: { tenderId: string } }) {
  const tender = useTender(params.tenderId);

  const [documents, setDocuments] = useState<any[]>([]);
  const [required, setRequired] = useState<any>(null);

  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState("TOR");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!tender) return;

    fetchTenderDocuments(params.tenderId)
      .then(setDocuments)
      .catch(() => {});

    fetchRequiredDocuments(params.tenderId)
      .then(setRequired)
      .catch(() => {});
  }, [tender, params.tenderId]);

  if (!tender || !required) return <div className="p-6">Loading...</div>;

  async function handleUpload() {
    if (!file) return;
    setUploading(true);

    try {
      const uploaded = await uploadTenderDocument(params.tenderId, docType, file);
      setDocuments((prev) => [...prev, uploaded]);

      // Refresh required-doc status
      const req = await fetchRequiredDocuments(params.tenderId);
      setRequired(req);

      setFile(null);
    } finally {
      setUploading(false);
    }
  }

  return (
    <PageShell menu={menu} title={`Tender ${tender.id}`}>
      <SectionHeader
        title={tender.description}
        description="Tender details, documents, bidders, and evaluation entry point."
      />

      {/* Tender Info + Start Evaluation */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <Card>
          <p><strong>Department:</strong> {tender.department}</p>
          <p><strong>Closing Date:</strong> {tender.closingDate}</p>
          <p><strong>Status:</strong> <StatusChip status={tender.status} /></p>
        </Card>

        <Card>
          <Link
            href={`/evaluations/${tender.id}/compliance`}
            className="text-blue-600 underline"
          >
            Start Evaluation →
          </Link>
        </Card>
      </div>

      {/* Documents + Bidders */}
      <div className="grid grid-cols-2 gap-6">
        {/* DOCUMENTS */}
        <Card>
          <h3 className="font-semibold mb-2">Documents</h3>

          {/* Upload UI */}
          <div className="mb-4 space-y-2">
            <Select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
            >
              {docTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </Select>

            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm"
            />

            <Button onClick={handleUpload} disabled={uploading || !file}>
              {uploading ? "Uploading..." : "Upload Document"}
            </Button>
          </div>

          {/* Required Document Status */}
          <div className="mb-4">
            <h4 className="font-semibold mb-1">Required Documents</h4>

            <div className="flex justify-between">
              <span>Terms of Reference (TOR)</span>
              <StatusChip status={required.hasTOR ? "approved" : "pending"} />
            </div>

            <div className="flex justify-between">
              <span>Specification Document (SPEC)</span>
              <StatusChip status={required.hasSpec ? "approved" : "pending"} />
            </div>
          </div>

          {/* Document List */}
          <ul className="list-disc list-inside">
            {documents.map((d: any) => (
              <li key={d.id}>
                [{d.type}]{" "}
                <a
                  href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/documents/${d.id}/download`}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {d.originalName}
                </a>{" "}
                ({Math.round(d.size / 1024)} KB)
              </li>
            ))}
          </ul>
        </Card>

        {/* BIDDERS */}
        <Card>
          <h3 className="font-semibold mb-2">Bidders</h3>
          <ul className="list-disc list-inside">
            {tender.bidders?.map((b: any) => (
              <li key={b.name}>{b.name}</li>
            ))}
          </ul>
        </Card>
      </div>
    </PageShell>
  );
}
