"use client";

interface Props {
  tenderId: string;
}

export default function VerifyButton({ tenderId }: Props) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/verify/latest/${tenderId}`;

  return (
    <a
      href={url}
      target="_blank"
      className="inline-block px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Verify This Report
    </a>
  );
}
