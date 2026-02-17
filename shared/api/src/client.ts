export function createApiClient(baseUrl: string, getToken: () => string | null) {
  async function request(path: string, options: RequestInit = {}) {
    const token = getToken();
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };

    const res = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers
    });

    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  }

  return { request };
}
