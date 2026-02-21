const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchTenderDocuments(tenderId: string) {
  const res = await fetch(`${BASE_URL}/documents/tender/${tenderId}`, {
    cache: "no-store"
  });
  if (!res.ok) throw new Error("Failed to load documents");
  return res.json();
}

export async function fetchRequiredDocuments(tenderId: string) {
  const res = await fetch(`${BASE_URL}/documents/required/${tenderId}`, {
    cache: "no-store"
  });
  if (!res.ok) throw new Error("Failed to load required document status");
  return res.json();
}

export async function uploadTenderDocument(
  tenderId: string,
  type: string,
  file: File
) {
  const formData = new FormData();
  formData.append("tenderId", tenderId);
  formData.append("type", type);
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/documents/upload`, {
    method: "POST",
    body: formData
  });

  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}
