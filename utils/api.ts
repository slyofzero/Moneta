export async function apiFetcher<T>(
  url: string,
  headerObj?: Record<string, string>
) {
  try {
    const headers = new Headers(headerObj);
    headers.append("accept", "application/json");
    const response = await fetch(url, { headers });
    const data = (await response.json()) as T;
    return { response: response.status, data };
  } catch (error) {
    return null;
  }
}
