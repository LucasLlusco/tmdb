const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function tmdbFetch<T>(
  endpoint: string,
  params?: Record<string, string | number | undefined>,
  options?: RequestInit & { revalidate?: number }
): Promise<T> {
  const url = new URL(TMDB_BASE_URL + endpoint);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const res = await fetch(url.toString(), {
    ...options,
    headers: {
      Authorization: `${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    next: options?.revalidate
      ? { revalidate: options.revalidate }
      : undefined,
  });

  if (!res.ok) {
    throw new Error(`TMDB error: ${res.status}`);
  }

  return res.json();
}
