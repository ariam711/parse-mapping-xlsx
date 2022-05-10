export function normalizeImageUrl(url: string, addHttps = false): string {
  return url.replace(/^https?:\/\//i, addHttps ? 'https://' : '');
}
