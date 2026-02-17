import React, { useState } from "react";
import { OtpInput } from "./OtpInput";
import { PrimaryButton } from "../buttons/PrimaryButton";

export function MfaPrompt({
  onVerify
}: {
  onVerify: (code: string) => void;
}) {
  const [code, setCode] = useState("");

  return (
    <div className="space-y-4">
      <p className="text-text-muted text-sm">
        Enter the verification code sent to your device.
      </p>
      <OtpInput value={code} onChange={setCode} />
      <PrimaryButton
        className="w-full"
        onClick={() => onVerify(code)}
        disabled={code.length === 0}
      >
        Verify
      </PrimaryButton>
    </div>
  );
}
