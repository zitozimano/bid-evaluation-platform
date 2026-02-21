"use client";

import React, { useState } from "react";
import QrReader from "react-qr-reader";

export default function QrScanVerify() {
  const [result, setResult] = useState<any>(null);

  const handleScan = async (value: string | null) => {
    if (!value) return;

    try {
      const hash = value.split("/").pop();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/verify/${hash}`
      );

      const data = await res.json();
      setResult({ hash, ...data });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">
        Scan QR to Verify Report
      </h1>

      <QrReader
        delay={300}
        onScan={handleScan}
        onError={(err) => console.error(err)}
        style={{ width: "100%" }}
      />

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <p className="font-semibold">Tender: {result.tenderNumber}</p>
          <p>Type: {result.type}</p>
          <p className="text-sm break-all">Hash: {result.hash}</p>

          <div className="mt-3">
            {result.signatureValid ? (
              <p className="text-green-700 font-semibold">
                ✔ Signature Valid — Digitally signed by HydroFlow.
              </p>
            ) : (
              <p className="text-red-700 font-semibold">
                ✖ Signature Invalid — Not cryptographically signed.
              </p>
            )}
          </div>

          <div className="text-sm mt-2">
            <p>Algorithm: {result.algorithm ?? "N/A"}</p>
            <p>Signed At: {result.signedAt ?? "N/A"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
