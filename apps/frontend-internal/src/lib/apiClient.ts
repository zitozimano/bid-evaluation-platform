export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;
  const tenantCode =
    typeof window !== "undefined"
      ? localStorage.getItem("tenantCode")
      : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (tenantCode) {
    headers["x-tenant-code"] = tenantCode;
  }

  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `API error ${res.status} ${res.statusText}: ${text || "No body"}`
    );
  }

  return res.json();
}
