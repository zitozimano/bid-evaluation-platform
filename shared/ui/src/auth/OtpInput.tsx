import React from "react";

export function OtpInput({
  length = 6,
  value,
  onChange
}: {
  length?: number;
  value: string;
  onChange: (val: string) => void;
}) {
  const digits = value.padEnd(length, " ").slice(0, length).split("");

  const handleChange = (index: number, char: string) => {
    const arr = digits.slice();
    arr[index] = char.replace(/\D/g, "").slice(0, 1);
    onChange(arr.join("").trim());
  };

  return (
    <div className="flex gap-2">
      {digits.map((d, i) => (
        <input
          key={i}
          value={d.trim()}
          onChange={(e) => handleChange(i, e.target.value)}
          className="w-10 h-10 text-center rounded-md bg-surface-light border border-surface-lighter text-text"
        />
      ))}
    </div>
  );
}
