export function normalizeImageUrl(url: string): string {
  return url.replace(/^https?:\/\//i, '');
}
