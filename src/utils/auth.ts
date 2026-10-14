// Reads the logged-in user's id from the JWT payload stored in localStorage.
export function getCurrentUserId(): string | null {
  const token = localStorage.getItem("userToken");
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const json = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
    );
    if (typeof json.user === "object" && json.user !== null) {
      return json.user._id ?? json.user.id ?? null;
    }
    return json.user ?? json.id ?? json._id ?? json.userId ?? null;
  } catch {
    return null;
  }
}
