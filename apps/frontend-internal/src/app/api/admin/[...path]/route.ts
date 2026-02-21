import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/${params.path.join("/")}`;
  const res = await fetch(url);
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(req: Request, { params }: any) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/${params.path.join("/")}`;
  const body = await req.json();
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return NextResponse.json(data);
}

export async function PUT(req: Request, { params }: any) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/${params.path.join("/")}`;
  const body = await req.json();
  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return NextResponse.json(data);
}
