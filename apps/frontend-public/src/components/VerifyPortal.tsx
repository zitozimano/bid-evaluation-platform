"use client";

import React from "react";

interface Props {
  hash: string;
  tenderNumber: string;
  type: string;
  signatureValid: boolean;
  signedAt?: string | null;
  algorithm?: string | null;
}

export default function VerifyPortal({
  hash,
  tenderNumber,
  type,
  signatureValid,
  signedAt,
  algorithm,
}: Props) {
  return (
    <div className="max-w-2xl mx-auto mt-16 p-8 bg-white shadow rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-center mb-6">
        Verification Result
      </h1>

      <div className="space-y-4">
        <div>
          <p className="text-gray-600 text-sm">Tender Number</p>
          <p className="font-semibold">{tenderNumber}</p>
        </div>

        <div>
          <p className="text-gray-600 text-sm">Report Type</p>
          <p className="font-semibold">{type}</p>
        </div>

        <div>
          <p className="text-gray-600 text-sm">Verification Hash</p>
          <p className="font-mono text-sm break-all">{hash}</p>
        </div>

        <div className="pt-4 border-t">
          <p className="text-gray-600 text-sm mb-1">Digital Signature</p>

          {signatureValid ? (
            <p className="text-green-700 font-semibold">
              ✔ Signature Valid — This report is digitally signed by HydroFlow.
            </p>
          ) : (
            <p className="text-red-700 font-semibold">
              ✖ Signature Invalid — This report is NOT cryptographically signed.
            </p>
          )}

          <div className="mt-2 text-sm text-gray-700">
            <p>Algorithm: {algorithm ?? "N/A"}</p>
            <p>Signed At: {signedAt ?? "N/A"}</p>
          </div>
        </div>

        <div className="pt-6 border-t">
          <a
            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/certificate/${hash}`}
            target="_blank"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download Verification Certificate (PDF)
          </a>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-500">
        HydroFlow Digital Governance Backbone — Ensuring transparency,
        integrity, and trust.
      </div>
    </div>
  );
}
