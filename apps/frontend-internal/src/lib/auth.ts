export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function requireRole(allowed: string[]) {
  const user = getCurrentUser();
  if (!user) return false;
  return allowed.includes(user.role);
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  localStorage.removeItem("tenantCode");
}
