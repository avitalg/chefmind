export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

const DEFAULT_UTM: UtmParams = {
  utm_source: 'web',
  utm_medium: 'web',
};

/**
 * Appends UTM parameters to a path or URL. Preserves existing query params.
 */
export function addUtmToPath(pathOrUrl: string, params?: UtmParams): string {
  const merged = { ...DEFAULT_UTM, ...params };
  const search = new URLSearchParams();
  (Object.entries(merged) as [keyof UtmParams, string][]).forEach(([k, v]) => {
    if (v) search.set(k, v);
  });
  const q = search.toString();
  if (!q) return pathOrUrl;
  const sep = pathOrUrl.includes('?') ? '&' : '?';
  return `${pathOrUrl}${sep}${q}`;
}
