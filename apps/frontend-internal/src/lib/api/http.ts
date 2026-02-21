const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export function get(path: string) {
  return request(path);
}

export function post(path: string, body: any) {
  return request(path, {
    method: "POST",
    body: JSON.stringify(body)
  });
}
