import { notFound } from "next/navigation";
import VerifyPortal from "@/components/VerifyPortal";

interface Props {
  params: { hash: string };
}

export default async function VerifyPage({ params }: Props) {
  const { hash } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/verify/${hash}`,
    { cache: "no-store" }
  );

  if (!res.ok) return notFound();

  const data = await res.json();

  return (
    <VerifyPortal
      hash={hash}
      tenderNumber={data.tenderNumber}
      type={data.type}
      signatureValid={data.signatureValid}
      signedAt={data.signedAt}
      algorithm={data.algorithm}
    />
  );
}
